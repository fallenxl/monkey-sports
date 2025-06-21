import type { Metadata } from "next";
import {Poppins } from "next/font/google";
import "../globals.css";
import { get } from "http";

const getPoppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "MonkeyBet | Auth",
  description: "A betting platform for events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${getPoppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
