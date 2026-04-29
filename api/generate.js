export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { mood, words } = req.body;

  const prompt = `You are a calligraphy inspiration assistant. Generate a beautiful, short quote (${words} words) for the mood: "${mood}". Return ONLY the quote, nothing else.`;

  const response = await fetch(
  `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  }
);

  const data = await response.json();

  if (!response.ok) {
    return res.status(500).json({ error: 'Gemini API error', details: data });
  }

  const quote = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  res.status(200).json({ quote });
}
