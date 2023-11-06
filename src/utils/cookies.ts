"use server";

import { cookies } from "next/headers";

export const setAccessToken = (accessToken: string) => {
  return cookies().set("access_token", accessToken, { maxAge: 30 });
};

export const setRefreshToken = (refreshToken: string) => {
  return cookies().set("refresh_token", refreshToken, { maxAge: 30 });
};

export const getAccessToken = () => {
  return cookies().get("access_token");
};

export const getRefreshToken = () => {
  return cookies().get("refresh_token");
};

export const deleteAccessToken = () => {
  return cookies().delete("access_token");
};
export const deleteRefreshToken = () => {
  return cookies().delete("refresh_token");
};
