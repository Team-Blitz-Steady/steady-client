import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    cookies().delete("access_token");
    cookies().delete("refresh_token");
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Logout failed! Delete Cookies Manually..." },
      {
        status: 200,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        headers: {
          "content-type": "application/json",
          "Set-Cookie": [
            "access_token=; Path=/; Max-Age=0",
            "refresh_token=; Path=/; Max-Age=0",
          ],
        },
      },
    );
  }
  return NextResponse.json({ message: "Logout success!" });
}
