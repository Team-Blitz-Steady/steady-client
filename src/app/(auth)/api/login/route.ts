import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    cookies().set("access_token", token.access, {
      maxAge: 60 * 60 * 23, // 23 hours
      httpOnly: true,
      path: "/",
    });
    cookies().set("refresh_token", token.refresh, {
      maxAge: 60 * 60 * 23, // 23 hours
      httpOnly: true,
      path: "/",
    });
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({
    message: "login success!",
  });
}
