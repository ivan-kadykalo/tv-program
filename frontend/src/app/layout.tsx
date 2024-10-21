import React, { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/style/globals.scss";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { PublicEnvScript } from 'next-runtime-env';


const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TV program",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PublicEnvScript />
        <title>
          TV program
        </title>
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}

        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  );
}
