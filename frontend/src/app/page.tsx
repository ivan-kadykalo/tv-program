"use client";

import styles from "./page.module.scss";
import React, {FC, useEffect, useState} from "react";
import {Navigation} from "@/components/Navigation/Navigation";
import {EventsTable} from "@/components/EventsTable/EventsTable";
import {ProgramType, TVEvent} from "@/utils/typedefs";

const Home: FC = () => {
  const [events, setEvents] = useState<TVEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');

        setEvents(await response.json());
      } catch (error) {
        console.log('🚨🚨🚨', 'Error while fetching events:', error);
      }
    }

    fetchEvents();
  }, []);

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
        <EventsTable
          events={filteredEvents}
        />
      </main>
    </div>
  );
}

export default Home;
