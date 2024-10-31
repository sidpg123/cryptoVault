import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');
  const value = searchParams.get('value');

  if (!key || !value) {
    return NextResponse.json({ message: 'Key and value are required' }, { status: 400 });
  }

  // Set the cookie for the session
  cookies().set(key, value, {
    httpOnly: true, // Make it inaccessible to JavaScript
    secure: process.env.NODE_ENV === 'production', // Send only over HTTPS in production
    path: '/', // Available across the entire site
  });

  return NextResponse.json({
    message: 'Session cookie set successfully',
  });
}
