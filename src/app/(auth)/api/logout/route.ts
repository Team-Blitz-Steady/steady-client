import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { deleteCookie } from "cookies-next";

export async function GET() {
  try {
    cookies().delete("access_token");
    cookies().delete("refresh_token");
  } catch (error) {
    deleteCookie("access_token", { cookies });
    deleteCookie("refresh_token", { cookies });
    console.error(error);
    return NextResponse.json(
      { message: "Logout failed! Delete Cookies with other way..." },
      {
        status: 200,
      },
    );
  }
  return NextResponse.json({ message: "Logout success!" });
}
