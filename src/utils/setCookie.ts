"use server";

import { cookies } from "next/headers";

interface tokenType {
  accessToken: string;
  refreshToken: string;
}

export const create = async (data: tokenType) => {
  cookies().set("jwt", `${data}`, { maxAge: 30 });
};
