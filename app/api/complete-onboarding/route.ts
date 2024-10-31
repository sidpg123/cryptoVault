import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ message: 'Onboarding complete' });
    response.cookies.set({
        name: 'isOnboarded',
        value: 'true',
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'strict',
    });
    console.log('cookes set');

    return response;
}

