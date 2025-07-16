import { NextResponse } from 'next/server';

export function middleware(req) {
  // Get cookies
  const cookies = req.cookies;
  
  // Check if user is logged in (e.g., using JWT or custom user cookie)
  const user = cookies.token || null;  // Example: if a JWT token is stored in cookies as 'token'

  let guestId;

  // If user is not logged in, assign a guest identity
  if (!user) {
    // If guestId cookie doesn't exist, create one using user-agent or timestamp
    guestId = cookies.guestId || 'guest-' + Date.now();
    
    // Set the guestId cookie for future visits
    NextResponse.next().cookies.set('guestId', guestId);
    
    console.log('Guest Identity:', guestId);
  } else {
    // Log the user identity if authenticated
    console.log('User Identity:', user);
  }

  // Log page visited
  console.log('Page visited:', req.nextUrl.pathname);

  // Optionally check if it's localhost or live URL
  const isLocal = req.headers.get('host').includes('localhost');
  if (isLocal) {
    console.log('Visited from localhost');
  } else {
    console.log('Visited from live URL');
  }

  // Return the response and continue the request cycle
  return NextResponse.next();
}
