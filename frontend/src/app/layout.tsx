import React, { ReactNode } from "react";
import type { Metadata } from "next";
import "@/styles/globals.scss";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Телепрограма",
  description: "Які фільми та мультфільми були в трансляції на тв протягом 10 днів",
  generator: "Next.js",
  manifest: "/webmanifest",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-180x180.png" },
    { rel: "icon", url: "icons/favicon.ico" },
    { rel: "apple-touch-startup-image", url: "icons/icon-512x512.png" },
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => console.log('Service Worker registered successfully.'))
      .catch((error) => console.error('Service Worker registration failed:', error));
  }

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
