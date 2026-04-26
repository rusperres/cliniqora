import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const ROLE_ROUTES = {
  patient: ["/patient"],
  staff: ["/staff"],
  admin: ["/admin"]
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const userRole = request.cookies.get("role")?.value
  const isLoggedIn = request.cookies.get("session")?.value
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (pathname.startsWith("/admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url))
  }

  if (pathname.startsWith("/staff") && userRole !== "staff" && userRole !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url))
  }

  if (pathname.startsWith("/patient") && !["patient", "staff", "admin"].includes(userRole || "")) {
    return NextResponse.redirect(new URL("/unauthorized", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/staff/:path*", "/patient/:path*"]
}