import React, { ReactNode } from "react";
import type { Metadata } from "next";
import "@/styles/globals.scss";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Link from "next/link";
import styles from "@/app/page.module.scss";

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

      <body className={styles.page}>
        <header>
          {/*<Navigation*/}
          {/*  programType={programType}*/}
          {/*  setProgramType={setProgramType}*/}
          {/*/>*/}

          <Link href={'/movies'}>Movies</Link>
          <Link href={'/cartoons'}>Cartoons</Link>
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
