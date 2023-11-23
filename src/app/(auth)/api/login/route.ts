import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    cookies().set("access_token", token.access, {
      maxAge: 60 * 60 * 23, // 23 hours
    });
    cookies().set("refresh_token", token.refresh, {
      maxAge: 60 * 60 * 23, // 23 hours
    });
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json(
    {
      message: "login success!",
    },
    {
      status: 200,
      headers: corsHeaders,
    },
  );
}
