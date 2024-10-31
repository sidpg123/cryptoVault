import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Get the cookie key from the query parameters
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key') || '';

  // Retrieve the cookie value
  const value = cookies().get(key)?.value;

  console.log('key', key);
  console.log('value', value);

  // Return the cookie value or false if not found
  return NextResponse.json({
    value: value !== undefined ? value : false,
  });
}
