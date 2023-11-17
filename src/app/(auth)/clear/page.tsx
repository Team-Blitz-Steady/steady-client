"use client";

import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/isAuth";

const Clear = () => {
  const { setIsAuth } = useAuthStore();
  const router = useRouter();
  setIsAuth(false);
  router.replace("/");
  return null;
};

export default Clear;
