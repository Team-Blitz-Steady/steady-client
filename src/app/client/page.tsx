"use client";

import getKakaoLoginUrl from "@/services/oauth/kakao/getKakaoLoginURL";

const ClientPage = () => {
  return (
    <div className="w-full">
      <button
        onClick={() => {
          getKakaoLoginUrl();
        }}
      >
        URL 가져와봐~
      </button>
    </div>
  );
};

export default ClientPage;
