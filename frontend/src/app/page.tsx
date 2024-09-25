"use client";

import styles from "./page.module.scss";
import React, {useState} from "react";
import {Navigation} from "@/components/Navigation/Navigation";
import {EventsTable} from "@/components/EventsTable/EventsTable";
import tvSchedule from "@/app/tv_schedule.json";
import {ProgramType, TVEvent} from "@/utils/typedefs";

export default function Home() {
  const [programType, setProgramType] = useState(ProgramType.MOVIE);

  const fetchedEvents = tvSchedule as unknown as TVEvent[];
  const events = fetchedEvents.filter((event) => event.type === programType)

  return (
    <div className={styles.page}>
      <header>
        <Navigation
          programType={programType}
          setProgramType={setProgramType}
        />
      </header>

      <main>
        <EventsTable
          events={events}
        />
      </main>
    </div>
  );
}
