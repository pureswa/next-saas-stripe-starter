import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { messages, prompt } = await req.json();
    
    if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ error: 'GROQ API key is not set' }, { status: 500 });
    }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        ...messages,
        { role: 'system', content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      temperature: 0.7,
    });

    return NextResponse.json(chatCompletion.choices[0].message);
  } catch (error) {
    console.error('Error processing Groq chat:', error);
    return NextResponse.json({ error: 'Failed to generate code' }, { status: 500 });
  }
}
