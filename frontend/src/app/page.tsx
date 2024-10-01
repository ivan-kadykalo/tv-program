"use client";

import styles from "./page.module.scss";
import React, { FC, useState} from "react";
import {Navigation} from "@/components/Navigation/Navigation";
import {EventsTable} from "@/components/EventsTable/EventsTable";
import {ProgramType} from "@/utils/typedefs";
import {useFetchEvents} from "@/hooks/useFetchEvents.hook";

const Home: FC = () => {
  const { events, loading } = useFetchEvents();

  const [programType, setProgramType] = useState(ProgramType.MOVIE);
  const filteredEvents = events.filter((event) => event.type === programType)

  return (
    <div className={styles.page}>
      <header>
        <Navigation
          programType={programType}
          setProgramType={setProgramType}
        />
      </header>

      <main>
        {loading
          ? (
            <div className={styles.loaderContainer}>
              <div className={styles.loader}></div>
            </div>
          )
          : <EventsTable events={filteredEvents} />
        }
      </main>
    </div>
  );
}

export default Home;
