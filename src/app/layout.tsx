import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
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
      <body className="h-screen">
        <Theme className="h-full">
          <div
            className={cn(
              `max-mobile:w-9/10 w-7/8 mx-auto flex h-full flex-col items-center pb-30`,
            )}
          >
            <AppBar isLogin={false} />
            {children}
          </div>
        </Theme>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
