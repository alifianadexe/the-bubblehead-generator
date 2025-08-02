import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JupFluencer Helm Generator",
  description:
    "Transform your profile picture with space helmet design. Join the Jupiter ecosystem with your custom helm avatar!",
  keywords: [
    "profile picture",
    "avatar generator",
    "space helmet",
    "jupiter",
    "solana",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/favicon.ico", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
