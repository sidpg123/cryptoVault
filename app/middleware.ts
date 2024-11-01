// // middleware.js
// import { NextRequest, NextResponse } from 'next/server';

// export function middleware(req: NextRequest) {
//     const url = req.nextUrl.clone();
//     const isOnboarded = req.cookies.get('isOnboarded')?.value === 'true';
//     // console.log('isOnboarding', isOnboarded);
    
//     // If user hasn't onboarded, redirect to onboarding if accessing `/wallet`
//     if (!isOnboarded && url.pathname === '/wallet') {
//         url.pathname = '/onboarding';
//         return NextResponse.redirect(url);
//     }

//     // If user has onboarded, prevent access to `/onboarding`
//     if (isOnboarded && url.pathname === '/onboarding') {
//         url.pathname = '/wallet';
//         return NextResponse.redirect(url);
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: ['/wallet', '/onboarding'], // Apply to these routes
// };


// middleware.js
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();

    // Log the cookie for debugging
    // console.log('isOnboarded cookie:', req.cookies.get('isOnboarded')?.value);

    const isOnboarded = req.cookies.get('isOnboarded')?.value === 'true';

    if (!isOnboarded && url.pathname === '/wallet') {
        // console.log("Redirecting to /onboarding because onboarding isn't complete.");
        url.pathname = '/onboarding';
        return NextResponse.redirect(url);
    }

    if (isOnboarded && url.pathname === '/onboarding') {
        // console.log("Redirecting to /wallet because onboarding is complete.");
        url.pathname = '/wallet';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/wallet', '/onboarding'],
};
