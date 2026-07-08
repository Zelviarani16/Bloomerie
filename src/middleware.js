/*
  middleware.js
  Proteksi route:
  - /admin/* → hanya admin yang boleh akses
  - /profile → harus login
*/

import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Baca user dari cookie (di-set oleh AuthContext saat login)
  const userCookie = request.cookies.get("bloomerie_user");
  let user = null;

  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value);
    } catch (e) {
      user = null;
    }
  }

  // Proteksi /admin/* — hanya admin
  if (pathname.startsWith("/admin")) {
    if (!user) {
      // Belum login → redirect ke login
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (user.role !== "admin") {
      // Login tapi bukan admin → redirect ke homepage
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Proteksi /profile — harus login
  if (pathname === "/profile") {
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile"],
};
