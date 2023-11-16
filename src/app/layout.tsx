import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/lib/react-query/QueryProvider";
import { cn } from "@/lib/utils";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import AppBar from "@/components/_common/AppBar";
import Footer from "@/components/_common/Footer";
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
  const hasAccessToken = cookies().has("access_token");

  return (
    <QueryProvider>
      <html
        lang="ko"
        className={inter.className}
      >
        <body className="h-screen">
          <Theme>
            <div
              className={cn(
                `max-mobile:w-9/10 mx-auto flex w-3/4 flex-col items-center`,
              )}
            >
              <AppBar isLogin={hasAccessToken} />
              <div className={cn("mb-30")}>{children}</div>
              <Footer />
            </div>
          </Theme>
          <Toaster />
        </body>
      </html>
    </QueryProvider>
  );
};

export default RootLayout;
