"use client";

import styles from "./page.module.scss";
import React, { FC, useState} from "react";
import {Navigation} from "@/components/Navigation/Navigation";
import {EventsTable} from "@/components/EventsTable/EventsTable";
import {ProgramType} from "@/utils/typedefs";
import {useFetchEvents} from "@/hooks/useFetchEvents.hook";

// const events: TVEvent[] = [
//   {
//     id: 5883,
//     name: "Південний парк, 3 сезон, 10 с",
//     time: new Date("2024-10-04T14:55:00.000Z"),
//     channel: "Paramount Comedy",
//     type: ProgramType.MOVIE
//   },
//   {
//     "id": 5909,
//     "name": "Агенти справедливості, 1 сезон, 13 с. Смерть у весільній сукні",
//     "time": new Date('2024-10-04T23:50:00.000Z'),
//     "channel": "ТВІЙ СЕРІАЛ",
//     "type": ProgramType.CARTOON
//   },
// ]

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
