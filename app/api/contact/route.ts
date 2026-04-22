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

    // 2. Send email notification
    try {
      await resend.emails.send({
        from: 'Clickbriz Leads <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL!,
        subject: `New Lead: ${name} — ${service || 'General Inquiry'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">New Consultation Request</h2>
            <div style="background: #f8f9fb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Service:</strong> ${service || 'Not specified'}</p>
              <p><strong>Message:</strong></p>
              <p style="background: #fff; padding: 12px; border-left: 3px solid #2563eb;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p style="color: #6b7280; font-size: 13px;">Received at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Don't fail the request if only email fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}