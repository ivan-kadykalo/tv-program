import React, { ReactNode } from "react";
import type { Metadata } from "next";
import "@/style/globals.scss";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { PublicEnvScript } from 'next-runtime-env';


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

      <body>
        {children}

        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  );
}
