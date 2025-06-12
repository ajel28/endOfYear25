import { NextResponse } from "next/server";
import { auth0 } from "./lib/auth0";

// Main middleware function
export async function middleware(request) {
  const authRes = await auth0.middleware(request);

  const urlPath = request.nextUrl.pathname;

  // Allow Auth0 internal routes like /auth/* through without extra checks
  if (urlPath.startsWith("/auth")) {
    return authRes;
  }

  // Allow public routes (add more paths to this list as needed)
  const publicRoutes = ["/"];
  if (publicRoutes.includes(urlPath)) {
    return authRes;
  }

  // Check if user has a session
  const session = await auth0.getSession();

  // If no session, redirect to login
  if (!session) {
    const { origin } = new URL(request.url);
    return NextResponse.redirect(`${origin}/auth/login`);
  }

  // Authenticated — proceed
  return authRes;
}

// Configure which routes middleware applies to
export const config = {
  matcher: [
    /**
     * Match all request paths except the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - api (API routes)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api).*)",
  ],
};
