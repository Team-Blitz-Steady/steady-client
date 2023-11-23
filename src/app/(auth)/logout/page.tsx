"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/isAuth";
import axios from "axios";
import { deleteCookie } from "cookies-next";

const Logout = () => {
  const router = useRouter();
  const { setIsAuth } = useAuthStore();
  useEffect(() => {
    axios.get("https://steadies.kr/api/logout").then(() => {
      deleteCookie("access_token", {
        path: "/",
        domain: ".steadies.kr",
      });
      deleteCookie("refresh_token", {
        path: "/",
        domain: ".steadies.kr",
      });
      setIsAuth(false);
      router.replace("/");
    });
  }, [router, setIsAuth]);
  return null;
};

export default Logout;
