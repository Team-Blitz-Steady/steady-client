import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    cookies().delete("access_token");
    cookies().delete("refresh_token");
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Logout failed!" });
  }

  return NextResponse.json({ message: "Logout success!" });
}
