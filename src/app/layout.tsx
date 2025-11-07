import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}

