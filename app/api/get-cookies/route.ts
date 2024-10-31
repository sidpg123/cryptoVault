import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    // Get the cookie with the key `isOnboarded`
    const isOnboarded = cookies().get('isOnboarded')?.value;
    console.log('isOnboarded', isOnboarded)
        // If you want to return all cookies, you could do so by using the `cookies()` object directly.
    // const allCookies = Object.fromEntries(cookies().getAll().map((c) => [c.name, c.value]));

    return NextResponse.json({
        isOnboarded: isOnboarded || false,
        //   allCookies: allCookies
    });
}