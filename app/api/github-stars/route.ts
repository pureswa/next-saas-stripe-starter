import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://api.github.com/repos/mickasmt/next-saas-stripe-starter', {
    next: { revalidate: 6 } // Revalidate every hour
  });
  const data = await res.json();
  return NextResponse.json({ stars: data.stargazers_count });
}
