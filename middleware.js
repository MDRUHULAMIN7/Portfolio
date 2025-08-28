import { NextResponse } from "next/server";
export async function middleware(req) {
  const cookies = req.cookies;
  const user = cookies.token || null;


  const ip =
    req.headers.get("x-forwarded-for") || req.headers.get("host") || "unknown";
  const userAgent = req.headers.get("user-agent") || "unknown";
  const guestId = cookies.guestId || "guest-" + Date.now();

  if (!user) {
    
  
  
    const res = NextResponse.next();
    res.cookies.set("guestId", guestId, { path: "/" });

    // Send visitor info to backend API
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/visitor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ip, userAgent }),
    }).catch((err) => console.error("Failed to log visitor 😊:", err));

    
  }

   const pathname = req.nextUrl.pathname;
    console.log("Path:", pathname);


  const protectedRoutes = ["/dashboard"];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
console.log("Is Protected Route:", isProtectedRoute);

  
  const token =
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value;
  console.log("Token:", token);

  if (isProtectedRoute && !token) {

    const redirectUrl = new URL("/login", req.url);
    redirectUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|assets|.*\\..*|_next).*)"],
};