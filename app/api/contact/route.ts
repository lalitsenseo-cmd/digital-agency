import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Save to Supabase
    const { error: dbError } = await supabaseAdmin.from('contact_leads').insert({
      name, email, service, message,
    });

    if (dbError) {
      console.error('DB error:', dbError);
      return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 });
    }

    // 2. Email notification
    try {
      await resend.emails.send({
        from: 'Clickbriz Leads <onboarding@resend.dev>',
        to: 'clickbriz@gmail.com',
        subject: `🔥 New Lead: ${name} — ${service || 'General Inquiry'}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <h2 style="color:#1e3a8a;">New Consultation Request 🚀</h2>
            <div style="background:#f8f9fb;padding:20px;border-radius:8px;margin:20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Phone:</strong> ${(body as any).phone || 'Not provided'}</p>
              <p><strong>Service:</strong> ${service || 'Not specified'}</p>
              <p><strong>Message:</strong></p>
              <p style="background:#fff;padding:12px;border-left:3px solid #1e3a8a;">
                ${message.replace(/\n/g, '<br>')}
              </p>
            </div>
            <p style="color:#6b7280;font-size:13px;">
              Received at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </p>
            <a href="https://wa.me/91${process.env.WHATSAPP_NUMBER}?text=Hi ${encodeURIComponent(name)}, I saw your inquiry about ${encodeURIComponent(service || 'our services')}."
              style="display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;margin-top:10px;">
              💬 Reply on WhatsApp
            </a>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
    }

    // 3. Telegram notification (Free WhatsApp alternative)
    try {
      if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
        const telegramMsg = `🔥 *New Lead!*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n🛠 *Service:* ${service || 'Not specified'}\n💬 *Message:* ${message}\n\n⏰ ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;
        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: telegramMsg,
            parse_mode: 'Markdown',
          }),
        });
      }
    } catch (telegramError) {
      console.error('Telegram error:', telegramError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}