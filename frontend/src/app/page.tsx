"use client";

import styles from "./style/page.module.scss";
import React, {useCallback, useMemo, useState} from "react";
import {EventsList} from "@/app/components/EventsList/EventsList";
import {ProgramType, TVEvent} from "@/app/components/Event/Event.typedefs";
import {EventTypesSection} from "@/app/components/EventTypesSection/EventTypesSection";


import tvSchedule from '../../../server/src/tv_schedule.json';

export default function Home() {
  const [selectedType, setSelectedType] = useState<ProgramType>(ProgramType.MOVIE);

  const filteredEvents = useMemo(() => (
    tvSchedule.filter((event) => event.type === selectedType)
  ), [selectedType]);

  const handleTypeSelect = useCallback((type: ProgramType) => {
    setSelectedType(type);
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Що сьогодні подивитись?
        </h1>

        <p className={styles.description}>
          Глянь телепрограму на тиждень
        </p>

        <EventTypesSection
          selectedType={selectedType}
          onTypeSelect={handleTypeSelect}
        />

        <EventsList
          events={filteredEvents}
        />
      </main>
    </div>
  );
}
