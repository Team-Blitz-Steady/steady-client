import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
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

  return redirect("/");
}
