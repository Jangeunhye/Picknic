import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "투잇",
  description: "오늘 뭐 먹지?",
};

export default function HTMLLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-[100%] h-[100%]">
      <body className={`${inter.className} w-[100%] h-[100%]`}>
        {/* <Script
          strategy="beforeInteractive"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_API_KEY}&libraries=services&autoload=false`}
        /> */}
        {children}
      </body>
    </html>
  );
}
