import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
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
        <Theme>{children}</Theme>
      </body>
    </html>
  );
};

export default RootLayout;
