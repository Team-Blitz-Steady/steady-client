import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.headers.get("Cookie");
  const isAuthenticated = cookie?.includes("access_token"); // TODO: 토큰 이름 은닉?
  const response = NextResponse.next();
  response.headers.append("Access-Control-Allow-Credentials", "true");
  response.headers.append(
    "Access-Control-Allow-Origin",
    "https://steady-client.vercel.app/",
  );
  response.headers.append(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT",
  );
  response.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );
  if (isAuthenticated) {
    return response;
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
    "/application/:id*",
    "/mysteady",
    "/mypage/:path*",
    "/logout",
  ],
};
