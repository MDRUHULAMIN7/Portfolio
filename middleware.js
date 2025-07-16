import { NextResponse } from "next/server";

export async function middleware(req) {
  const cookies = req.cookies;
  const user = cookies.token || null;

  const ip =
    req.headers.get("x-forwarded-for") || req.headers.get("host") || "unknown";
  const userAgent = req.headers.get("user-agent") || "unknown";
  const guestId = cookies.guestId || "guest-" + Date.now();

  if (!user) {
    // Set guestId cookie
    const res = NextResponse.next();
    res.cookies.set("guestId", guestId, { path: "/" });

    // Send visitor info to backend API
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/visitor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ip, userAgent }),
    }).catch((err) => console.error("Failed to log visitor:", err));

    return res;
  }

  console.log("User Identity:", user);
  console.log("Page visited:", req.nextUrl.pathname);

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/', // Only apply on homepage
    // Add more routes like '/products/:path*', etc., if needed
  ],
};
