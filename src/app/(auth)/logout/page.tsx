"use client";

import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/isAuth";
import useLoginStepsStore from "@/stores/loginSteps";
import { useQueryClient } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";

const Logout = () => {
  const router = useRouter();
  const { setIsAuth } = useAuthStore();
  const { setSteps } = useLoginStepsStore();
  const queryClient = useQueryClient();
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
  setSteps(0);
  setIsAuth(false);
  queryClient.clear();
  router.replace("/");
  return null;
};

export default Logout;
