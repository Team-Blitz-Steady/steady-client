import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.headers.get("Cookie");
  const isAuthenticated = cookie?.includes("access_token"); // TODO: 토큰 이름 은닉?
  if (isAuthenticated) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect("https://steadies.kr/");
  }
}

export const config = {
  matcher: [
    "/steady/edit/:path*",
    "/steady/create",
    "/steady/create/:path*",
    "/steady/manage/:id*",
    "/steady/review/:id*",
    "/steady/applicant/:id*",
    "/application",
    "/mysteady",
    "/mypage/:path*",
    "/logout",
  ],
};
