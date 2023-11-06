"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { deleteAccessToken, deleteRefreshToken } from "@/utils/cookies";

const LogOutPage = () => {
  useEffect(() => {
    deleteAccessToken();
    deleteRefreshToken();
    redirect("/");
  }, []);
  return null;
};

export default LogOutPage;
