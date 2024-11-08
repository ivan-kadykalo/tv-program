import React, { ReactNode } from "react";
import type { Metadata } from "next";
import "@/styles/globals.scss";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import styles from "@/app/page.module.scss";
import { Navigation } from "@/components/Navigation/Navigation";

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
        <title>
          TV program
        </title>
      </head>

      <body className={styles.pageBody}>
        <header className={styles.header}>
          <Navigation />
        </header>

        <main>
          {children}
        </main>

        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  );
}
