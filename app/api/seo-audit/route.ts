import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    const prompt = `You are an SEO expert. Analyze this website for SEO: ${url}

Return ONLY a valid JSON object. No markdown. No backticks. No explanation. Start directly with { and end with }.

Example format:
{"overall_score":72,"grade":"B","summary":"The website has decent SEO but needs improvement in several areas.","metrics":{"on_page_seo":{"score":75,"status":"Good","detail":"Title tags and meta descriptions are optimized"},"page_speed":{"score":55,"status":"Average","detail":"Page load time needs improvement"},"mobile_friendly":{"score":80,"status":"Good","detail":"Site is mobile responsive"},"backlinks":{"score":40,"status":"Poor","detail":"Very few quality backlinks detected"},"content_quality":{"score":70,"status":"Average","detail":"Content is decent but lacks depth"},"technical_seo":{"score":65,"status":"Average","detail":"Some technical issues found"}},"top_issues":["Slow page load speed","Very few backlinks","Missing alt tags"],"quick_wins":["Add meta descriptions","Compress images","Fix broken links"],"cta":"Let our experts fix these issues and grow your traffic by 300%!"}

Now analyze ${url} and return accurate JSON data for that website.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 8192,
          },
        }),
      }
    );

    const data = await response.json();

    // Gemini 2.5 thinking model — extract only non-thought parts
    let text = "";
    const parts = data.candidates?.[0]?.content?.parts ?? [];
    for (const part of parts) {
      if (part.text && !part.thought) {
        text += part.text;
      }
    }

        // ✅ YE 3 LINES ADD KARO YAHAN
    console.log("FULL RESPONSE:", JSON.stringify(data, null, 2));
    console.log("PARTS:", JSON.stringify(parts, null, 2));
    console.log("TEXT:", text);

    text = text.trim();

    // Clean markdown if present
    text = text.replace(/```json/gi, "").replace(/```/g, "").trim();

    // Extract JSON object
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      console.error("No JSON found in response:", text);
      return NextResponse.json(
        { error: "Analysis failed. Please try again." },
        { status: 500 }
      );
    }

    const json = JSON.parse(match[0]);
    return NextResponse.json(json);

  } catch (error) {
    console.error("SEO Audit error:", error);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}