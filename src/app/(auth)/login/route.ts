import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = JSON.parse(req.headers.get("Authorization") as string);
    cookies().set("access_token", token.access, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
    });
    cookies().set("refresh_token", token.refresh, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
    });
  } catch (error) {
    console.error(error);
  }
  return NextResponse.redirect(new URL("/", req.nextUrl));
}
