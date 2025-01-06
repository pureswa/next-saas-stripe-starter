import { NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function POST(req: Request) {
  const { messages, prompt } = await req.json();

  if (!GROQ_API_KEY) {
    return NextResponse.json({ error: 'GROQ API key is not set' }, { status: 500 });
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // Use the correct model name
        messages: [
          ...messages,
          { role: 'system', content: prompt }
        ],
        max_tokens: 1024, // Adjust as needed
        temperature: 0.7, // Adjust as needed
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('GROQ API error:', errorData);
      throw new Error(errorData.error?.message || 'GROQ API request failed');
    }

    const data = await response.json();
    return NextResponse.json(data.choices[0].message);
  } catch (error) {
    console.error('Error calling GROQ API:', error);
    return NextResponse.json({ error: 'Failed to generate code' }, { status: 500 });
  }
}
