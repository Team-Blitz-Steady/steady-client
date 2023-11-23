import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    req.headers.set("Content-Type", "application/json");
    req.headers.append("Access-Control-Allow-Credentials", "true");
    req.headers.append(
      "Access-Control-Allow-Origin",
      "https://www.steadies.kr",
    );
    req.headers.append(
      "Access-Control-Allow-Methods",
      "GET,DELETE,PATCH,POST,PUT",
    );
    req.headers.append(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    );
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

  if (req.method === "OPTIONS") {
    return NextResponse.json({
      status: 200,
    });
  }

  return NextResponse.json({ result: "Ok" }, { status: 200 });
}
