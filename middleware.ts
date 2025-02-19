import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // اگر مسیر دقیقا برابر /profile بود، به /profile/acc ریدایرکت کن
  if (pathname === "/profile") {
    const url = req.nextUrl.clone();
    url.pathname = "/profile/acc";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// مشخص کردن matcher برای اعمال middleware تنها بر روی /profile
export const config = {
  matcher: "/profile",
};
