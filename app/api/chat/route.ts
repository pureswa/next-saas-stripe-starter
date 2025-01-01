import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Here you would typically integrate with an AI service
    // For now, we'll just echo back a simple response
    const response = `You said: "${message}". This is a demo response.`;

    return NextResponse.json({ message: response });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
} 