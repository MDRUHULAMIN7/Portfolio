import { NextResponse } from "next/server";
export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  const protectedRoutes = ["/dashboard"];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  
  const token =
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value;

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