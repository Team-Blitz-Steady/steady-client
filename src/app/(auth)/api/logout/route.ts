import { cookies } from "next/headers";
import { deleteCookie } from "cookies-next";

export async function GET() {
  try {
    cookies().delete("access_token");
    cookies().delete("refresh_token");
  } catch (error) {
    deleteCookie("access_token", { cookies });
    deleteCookie("refresh_token", { cookies });
    console.error(error);
    return new Response("Logout failed! trying another way...", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "https://www.steadies.kr",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
  return new Response("Logout success!", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "https://www.steadies.kr",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
