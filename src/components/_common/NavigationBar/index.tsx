"use client";

import Link from "next/link";

interface NavigationBarProps {
  path: string;
}

const NavigationBar = ({ path }: NavigationBarProps) => {
  return (
    <div className="fixed bottom-0 flex h-80 w-full items-center justify-around bg-st-white px-20 py-10 shadow-md shadow-md md:hidden">
      <Link href={"/mysteady"}>
        <div
          className={`${
            path === "/mysteady" && "text-st-primary"
          } flex flex-col items-center justify-center font-bold`}
        >
          <svg
            className={`${path === "/mysteady" ? "text-st-primary" : "black"}`}
            width="35"
            height="35"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.139 20.4866C13.5303 19.4663 17.3703 18.0379 21.5999 20.4866V5.18226M2.3999 4.904V20.4866C3.79121 19.4663 7.63121 18.0379 11.8608 20.4866V5.46052M2.3999 4.86475C3.79121 3.84446 7.63121 2.41605 11.8608 4.86475M12.139 4.86475C13.5303 3.84446 17.3703 2.41605 21.5999 4.86475"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          내 스테디
        </div>
      </Link>
      <Link href={"/"}>
        <div
          className={`${
            path === "/" && "text-st-primary"
          } flex flex-col items-center justify-center font-bold`}
        >
          <svg
            className={`${path === "/" ? "text-st-primary" : "black"}`}
            width="35"
            height="35"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 21V14.1528C9 13.5226 9.53726 13.0116 10.2 13.0116H13.8C14.4627 13.0116 15 13.5226 15 14.1528V21M11.3046 3.21117L3.50457 8.48603C3.18802 8.7001 3 9.04665 3 9.41605V19.2882C3 20.2336 3.80589 21 4.8 21H19.2C20.1941 21 21 20.2336 21 19.2882V9.41605C21 9.04665 20.812 8.70011 20.4954 8.48603L12.6954 3.21117C12.2791 2.92961 11.7209 2.92961 11.3046 3.21117Z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          홈
        </div>
      </Link>
      <Link href={"/steady/create"}>
        <div
          className={`${
            path === "/steady/create" && "text-st-primary"
          } flex flex-col items-center justify-center font-bold`}
        >
          <svg
            className={`${
              path === "/steady/create" ? "text-st-primary" : "black"
            }`}
            width="35"
            height="35"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5364 19.2433L13.2787 18.4114C14.1894 17.3907 15.8235 17.5234 16.5576 18.6777C17.2415 19.753 18.7273 19.9568 19.6755 19.1054L21.021 17.8974M2.97876 19.4704L7.34474 18.5907C7.57652 18.544 7.78934 18.4298 7.95648 18.2626L17.7302 8.48356C18.1988 8.01471 18.1984 7.25472 17.7294 6.78626L15.659 4.71818C15.1902 4.24991 14.4306 4.25023 13.9622 4.71889L4.18752 14.4989C4.02071 14.6658 3.90681 14.8782 3.86006 15.1095L2.97876 19.4704Z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          스테디 등록
        </div>
      </Link>
    </div>
  );
};

export default NavigationBar;
