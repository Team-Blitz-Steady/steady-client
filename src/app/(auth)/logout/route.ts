import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    cookies().delete("access_token");
    cookies().delete("refresh_token");
  } catch (error) {
    console.error(error);
  }
  return NextResponse.redirect(new URL("/clear", req.nextUrl));
}
