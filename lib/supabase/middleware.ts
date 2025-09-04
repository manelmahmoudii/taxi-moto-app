import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next()

  // Allow access to auth pages and homepage
  if (
    request.nextUrl.pathname.startsWith("/auth") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname === "/"
  ) {
    return response
  }

  return response
}
