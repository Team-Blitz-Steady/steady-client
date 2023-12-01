import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import Favicon from "@/images/favicon.ico";
import QueryProvider from "@/lib/react-query/QueryProvider";
import { cn } from "@/lib/utils";
import "@mdxeditor/editor/style.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import AppBar from "@/components/_common/AppBar";
import Footer from "@/components/_common/Footer";
import NavigationBar from "@/components/_common/NavigationBar";
import "./global.css";

export const metadata: Metadata = {
  title: "Steady",
  description: "The New Study & Project Join Platform",
  icons: [{ rel: "icon", url: Favicon.src }],
  openGraph: {
    title: "Steady",
    description: "스터디/프로젝트 모집 플랫폼",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body className="h-screen overflow-x-hidden">
        <QueryProvider>
          <Theme>
            <div
              className={cn(
                `max-mobile:w-9/10 mx-auto flex h-screen w-3/4 flex-col items-center`,
              )}
            >
              <AppBar />
              <div className="pb-100 md:pb-30">{children}</div>
              <Footer />
              <NavigationBar />
            </div>
          </Theme>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
