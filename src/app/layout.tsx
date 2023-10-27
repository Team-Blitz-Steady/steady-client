import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import AppBar from "@/components/_common/AppBar";
import "./global.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Steady",
  description: "The New Study & Project Join Platform",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="ko"
      className={inter.className}
    >
      <body>
        <Theme>
          <div className={`max-mobile:w-9/10 mx-auto h-screen w-3/4`}>
            <AppBar isLogin={false} />
            {children}
          </div>
        </Theme>
      </body>
    </html>
  );
};

export default RootLayout;
