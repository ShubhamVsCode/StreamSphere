import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateToken } from "./actions/auth";

const protectedRoutes = ["/protected"];
const authRoute = ["/login", "/register"];
const publicRoute = ["/"];

export function middleware(request: NextRequest) {
  // check if the request is for a protected route and if the user is logged in or not
  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (request.cookies.get("token")?.value) {
      const isLoggedIn = validateToken(request.cookies.get("token")?.value);
      if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/login", request.url).toString());
      }
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url).toString());
    }
  } else if (authRoute.includes(request.nextUrl.pathname)) {
    if (request.cookies.get("token")?.value) {
      return NextResponse.redirect(new URL("/", request.url).toString());
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
