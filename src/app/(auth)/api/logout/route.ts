import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { deleteCookie } from "cookies-next";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

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
        headers: corsHeaders,
      },
    );
  }
  return NextResponse.json({ message: "Logout success!" });
}
