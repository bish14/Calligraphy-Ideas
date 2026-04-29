export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { mood, words } = req.body;

  // 1. Validation to prevent empty prompts
  if (!mood) {
    return res.status(400).json({ error: 'Mood is required' });
  }

  const prompt = `You are a calligraphy inspiration assistant. Generate a beautiful, short quote (${words || 5} words) for the mood: "${mood}". Return ONLY the quote, nothing else.`;

  try {
    // 2. Updated URL with the correct 'models/' prefix and 'v1beta' endpoint
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    const data = await response.json();

    // 3. Detailed error logging so you can see it in Vercel Logs
    if (!response.ok) {
      console.error("Google API Error Details:", JSON.stringify(data));
      return res.status(response.status).json({ 
        error: 'Gemini API rejected the request', 
        details: data.error?.message || 'Unknown error' 
      });
    }

    // 4. Safe extraction of the text content
    const quote = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Keep creating beautiful things.";
    
    return res.status(200).json({ quote });

  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
