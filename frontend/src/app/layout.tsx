import React, { ReactNode } from "react";
import type { Metadata } from "next";
import "@/styles/globals.scss";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Телепрограма",
  manifest: "/webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="uk-UA">
    <head>
      <title>
        Телепрограма
      </title>

      <link rel="icon" href="/favicon.ico"/>
      <link rel="apple-touch-icon" href="/images/android-chrome-192x192.png"/>

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
    </head>

    <body>
    {children}

    <Analytics/>
    <SpeedInsights/>
    </body>
    </html>
  );
}
