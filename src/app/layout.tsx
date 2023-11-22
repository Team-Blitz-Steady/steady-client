import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/lib/react-query/QueryProvider";
import { cn } from "@/lib/utils";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import AppBar from "@/components/_common/AppBar";
import Footer from "@/components/_common/Footer";
import "./global.css";

export const metadata: Metadata = {
  title: "Steady",
  description: "The New Study & Project Join Platform",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <html lang="ko">
        <body className="h-screen overflow-x-hidden">
          <Theme>
            <div
              className={cn(
                `max-mobile:w-9/10 mx-auto flex w-3/4 flex-col items-center`,
              )}
            >
              <AppBar />
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
