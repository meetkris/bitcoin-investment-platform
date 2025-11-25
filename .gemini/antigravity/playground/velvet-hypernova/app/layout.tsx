import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Web3Provider } from "@/components/Web3Provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bitcoin Investment Platform | Buy, Invest & Track BTC Securely",
  description: "The world's most trusted Bitcoin investment platform. Start investing in Bitcoin with bank-grade security, real-time analytics, and instant trading.",
  keywords: ["Bitcoin", "BTC", "crypto investment", "blockchain technology", "cryptocurrency", "digital currency", "Bitcoin price", "buy Bitcoin"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Web3Provider>
          {children}
        </Web3Provider>
        <Analytics />
      </body>
    </html>
  );
}
