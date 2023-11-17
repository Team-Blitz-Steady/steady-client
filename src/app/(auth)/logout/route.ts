import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  try {
    cookies().delete("access_token");
    cookies().delete("refresh_token");
  } catch (error) {
    console.error(error);
  }
  return redirect("/clear");
}
