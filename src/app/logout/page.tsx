"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { deleteCookie } from "cookies-next";

const LogOutPage = () => {
  useEffect(() => {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    redirect("/");
  }, []);
  return null;
};

export default LogOutPage;
