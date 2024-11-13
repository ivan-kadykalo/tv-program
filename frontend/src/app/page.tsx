"use client";

import React, { FC, Suspense } from "react";
import styles from "@/app/page.module.scss";
import { EventsTable } from "@/components/EventsTable/EventsTable";
import { Navigation } from "@/components/Navigation/Navigation";
import cn from "classnames";
import { useEvents, useGetCurrentPageType } from "@/utils/hooks";
import { ProgramType } from "@/utils/typedefs";
import { Loader } from "@/components/Loader/Loader";
import { MAP_PAGE_TITLE } from "@/utils/constants";

const getColorMode: Record<ProgramType, string> = {
  [ProgramType.ALL]: styles.first,
  [ProgramType.MOVIE]: styles.second,
  [ProgramType.CARTOON]: styles.third,
};

const Page: FC = () => {
  const pageType = useGetCurrentPageType();
  const { events, loading } = useEvents(pageType);

  return (
    <div className={cn(styles.pageBody, getColorMode[pageType])}>
      <main className={styles.contentWrapper}>
        <h1 className={styles.title}>
          {MAP_PAGE_TITLE[pageType]}
        </h1>

        {loading
          ? <Loader />
          : <EventsTable events={events} pageType={pageType} />
        }
      </main>

      <Navigation pageType={pageType}/>
    </div>
  );
}

export default function PageWrapper() {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
}