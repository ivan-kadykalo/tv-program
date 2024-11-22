import React, { ReactNode } from "react";
import type { Metadata } from "next";
import "@/styles/globals.scss";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Телепрограма",
  description: "Які фільми та мультфільми були в трансляції на тв протягом 10 днів",
  generator: "Next.js",
  manifest: "/manifest.json",
  icons: [
    { rel: "apple-touch-icon", url: "icons/apple-touch-icon.png" },
    { rel: "icon", url: "icons/favicon.ico" },
  ]
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
