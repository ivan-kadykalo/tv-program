"use client";

import React, { FC } from "react";
import styles from "@/app/page.module.scss";
import { EventsTable } from "@/components/EventsTable/EventsTable";
import { Navigation } from "@/components/Navigation/Navigation";
import cn from "classnames";
import { useEvents, useGetCurrentPageType } from "@/utils/hooks";
import { ProgramType } from "@/utils/typedefs";

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
          Всі програми
        </h1>

        {loading
          ? <p>Завантаження...</p>
          : <EventsTable events={events}/>
        }
      </main>

      <header className={styles.header}>
        <Navigation/>
      </header>
    </div>
  );
}

export default Page;
