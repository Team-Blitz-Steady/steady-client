"use client";

import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/isAuth";
import axios from "axios";

const Logout = () => {
  const router = useRouter();
  const { setIsAuth } = useAuthStore();
  axios.get("https://steady-client.vercel.app/api/logout").then(() => {
    setIsAuth(false);
    router.replace("/");
  });
  return null;
};

export default Logout;
