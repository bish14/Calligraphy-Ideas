export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { mood, style, length } = req.body;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "API key not configured. Add ANTHROPIC_API_KEY to your Vercel environment variables."
    });
  }

  const systemPrompt = `You are a calligraphy creative assistant for Bhishma, based in Puttaparthi, India — the sacred town of Sathya Sai Baba. Generate enriched quote inspiration for hand lettering artists.

Bhishma's styles: Copperplate (pointed pen), Modern calligraphy, Brush lettering.
Languages: English, Hindi, Sanskrit (Devanagari), Gujarati.
Spiritual context: Sai Baba's teachings, Vedic invocations, bhajan phrases.

MOOD GUIDE:
- surprise: anything beautiful across all tones
- happy: warm and joyful (e.g. "Today is a good day for a good day", "Joy is a practice")
- spiritual: Sai Baba and Vedic wisdom (e.g. "Love all serve all", "Satyam Shivam Sundaram", "Om Sai Ram")
- motivational: grounded strength (e.g. "Begin. The rest follows.", "Himmat karo", "Courage is quiet")
- philosophical: timeless lines from Rumi, Kabir, Vedic sources
- poetry: lyrical and evocative verse-like lines

STYLE GUIDE:
- copperplate: elegant, oval-rich words, flourish opportunities
- modern: energetic, bounce-friendly phrases
- brush: punchy short phrases with rhythm

Aim for approximately ${length} words in the quote.

Respond ONLY with a raw JSON object — no markdown, no explanation. Use exactly these keys:
{
  "quote": "the main quote",
  "attribution": "author or source, or empty string",
  "style_note": "one sentence on why this suits the chosen style",
  "flourish_worthy": true or false,
  "devanagari": "Hindi or Sanskrit version of the sentiment, or empty string",
  "devanagari_transliteration": "romanised version of the above, or empty string",
  "practice_words": ["3 to 5 individual words ideal for letterform practice"],
  "instagram_caption": "3-4 line Instagram caption for sharing this as a calligraphy piece. One raw personal moment. End with 4 hashtags. No labels — paste-ready."
}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-20241022",
        max_tokens: 800,
        system: systemPrompt,
        messages: [{
          role: "user",
          content: `Generate a calligraphy quote for mood: "${mood}", style: "${style}", approximately ${length} words.`
        }]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: "Anthropic API error", detail: err });
    }

    const data = await response.json();
    const raw = data.content?.[0]?.text || "{}";

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : { error: "Could not parse response" };
    }

    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: "Server error", detail: err.message });
  }
}
