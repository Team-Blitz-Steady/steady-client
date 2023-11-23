"use client";

import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/isAuth";
import { deleteCookie } from "cookies-next";

const Logout = () => {
  const router = useRouter();
  const { setIsAuth } = useAuthStore();
  // useEffect(() => {
  //   axios.get("https://steady-client.vercel.app/api/logout").then(() => {
  //     deleteCookie("access_token", {
  //       path: "/",
  //       domain: ".steadies.kr",
  //     });
  //     deleteCookie("refresh_token", {
  //       path: "/",
  //       domain: ".steadies.kr",
  //     });
  //     setIsAuth(false);
  //     router.replace("/");
  //   });
  // }, [router, setIsAuth]);
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
  return null;
};

export default Logout;
