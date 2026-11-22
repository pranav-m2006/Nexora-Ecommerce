import { NextResponse, type NextRequest } from "next/server";

// Function to safely decode payload from cookie without importing full Node crypto in Edge runtime
function decodeJwtPayload(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    let b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) {
      b64 += "=";
    }
    const jsonStr = atob(b64);
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect Admin Pages
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("nexora_session");
    if (!sessionCookie?.value) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const payload = decodeJwtPayload(sessionCookie.value);
    if (!payload || payload.role !== "admin") {
      // Forbidden: Not an admin
      const forbiddenUrl = new URL("/account", request.url);
      forbiddenUrl.searchParams.set("error", "unauthorized_admin");
      return NextResponse.redirect(forbiddenUrl);
    }
  }

  // Protect Account Pages
  if (pathname.startsWith("/account")) {
    const sessionCookie = request.cookies.get("nexora_session");
    if (!sessionCookie?.value) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/account/:path*",
  ],
};
