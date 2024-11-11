import React, { ReactNode } from "react";
import type { Metadata } from "next";
import "@/styles/globals.scss";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Телепрограма",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>
          TV program
        </title>
      </head>

      <body>
        {children}

        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  );
}
