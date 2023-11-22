export const cookieService = {
  get: async (key: string) => {
    if (typeof window === "undefined") {
      const { cookies } = await import("next/headers");
      return cookies().get(key);
    }
    const { getCookie: get_cookie } = await import("cookies-next");
    return get_cookie(key);
  },
  set: async (key: string, value: string) => {
    if (typeof window === "undefined") {
      const { cookies } = await import("next/headers");
      return cookies().set(key, value);
    }
    const { setCookie: set_cookie } = await import("cookies-next");
    return set_cookie(key, value);
  },
  delete: async (key: string) => {
    if (typeof window === "undefined") {
      const { cookies } = await import("next/headers");
      return cookies().delete(key);
    }
    const { deleteCookie: delete_cookie } = await import("cookies-next");
    return delete_cookie(key);
  },
};
