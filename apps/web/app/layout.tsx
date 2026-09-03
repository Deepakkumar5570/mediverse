import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

import QueryProvider from "./providers/query-provider";

import { AppChrome } from "../src/components/navigation/app-chrome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MediVerse",
    template: "%s | MediVerse",
  },
  description:
    "A modern, structured medical learning platform for students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 font-sans">
        <ClerkProvider>
          <QueryProvider>
            <AppChrome>
              {children}
            </AppChrome>
          </QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}