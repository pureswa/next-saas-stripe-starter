import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { sql } = await req.json();

  if (!sql) {
    return NextResponse.json({ error: 'SQL query is required' }, { status: 400 });
  }

  // Basic SQL validation
  if (!sql.toLowerCase().startsWith('select')) {
    return NextResponse.json({ error: 'Only SELECT queries are allowed' }, { status: 400 });
  }

  console.log('Executing SQL:', sql); // Log the SQL query

  try {
    const result = await prisma.$queryRawUnsafe(sql);
    console.log('SQL result:', result); // Log the result
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error executing SQL:', error);
    return NextResponse.json({ error: 'Failed to execute SQL query', details: error.message }, { status: 500 });
  }
}
