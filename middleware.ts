import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// لیست originهای مجاز برای CORS
const ALLOWED_ORIGINS = [
  "https://pishro-admin.vercel.app",
  "http://localhost:3000", // برای development
  "http://localhost:3001",
];

// CORS headers مورد نیاز
function getCorsHeaders(origin: string | null) {
  // بررسی اینکه origin در لیست مجاز است
  const isAllowedOrigin = origin && ALLOWED_ORIGINS.includes(origin);

  return {
    "Access-Control-Allow-Origin": isAllowedOrigin ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie, X-Requested-With, Accept, Origin",
    "Access-Control-Max-Age": "86400", // 24 ساعت
  };
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const origin = req.headers.get("origin");

  // Handle کردن preflight requests (OPTIONS)
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: getCorsHeaders(origin),
    });
  }

  // اگر مسیر دقیقا برابر /profile بود، به /profile/acc ریدایرکت کن
  if (pathname === "/profile") {
    const url = req.nextUrl.clone();
    url.pathname = "/profile/acc";
    const response = NextResponse.redirect(url);

    // اضافه کردن CORS headers به redirect response
    const corsHeaders = getCorsHeaders(origin);
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  }

  // برای بقیه requestها، CORS headers اضافه کن
  const response = NextResponse.next();
  const corsHeaders = getCorsHeaders(origin);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

// مشخص کردن matcher برای اعمال middleware
export const config = {
  matcher: [
    "/profile/:path*",
    "/api/:path*", // تمام API routes
  ],
};
