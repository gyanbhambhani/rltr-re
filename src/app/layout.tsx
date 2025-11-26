import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { SearchProvider } from "@/components/search/SearchProvider";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "RLTR",
  description: "AI-Native Infrastructure Platform for Real Estate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.variable}>
        <SearchProvider>{children}</SearchProvider>
      </body>
    </html>
  );
}

