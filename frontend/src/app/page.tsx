"use client";

import React, {FC, Suspense} from "react";
import styles from "@/app/page.module.scss";
import { EventsTable } from "@/components/EventsTable/EventsTable";
import { Navigation } from "@/components/Navigation/Navigation";
import cn from "classnames";
import { useEvents, useGetCurrentPageType } from "@/utils/hooks";
import { ProgramType } from "@/utils/typedefs";
import {getPageTitle} from "@/utils/helpers";
import {Loader} from "@/components/Loader/Loader";

const Page: FC = () => {
  const pageType = useGetCurrentPageType();
  const { events, loading } = useEvents(pageType);

  return (
    <div
      className={cn(styles.pageBody, {
        [styles.first]: pageType === ProgramType.ALL,
        [styles.second]: pageType === ProgramType.MOVIE,
        [styles.third]: pageType === ProgramType.CARTOON,
      })}
    >
      <main>
        <h1 className={styles.title}>
          {getPageTitle(pageType)}
        </h1>

        {loading
          ? <Loader />
          : <EventsTable events={events} pageType={pageType}/>
        }
      </main>

      <header className={styles.header}>
        <Navigation pageType={pageType}/>
      </header>
    </div>
  );
}

export default function PageWrapper() {
  return (
    <Suspense fallback={
      <Loader />
    }>
      <Page />
    </Suspense>
  );
}