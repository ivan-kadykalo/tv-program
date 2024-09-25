import styles from "../page.module.scss";
import React from "react";
import {EventsTable} from "@/components/EventsTable/EventsTable";
import {Navigation} from "@/components/Navigation/Navigation";

import tvSchedule from "./tv_schedule.json";
import {Pages, ProgramTypeMapper} from "@/utils/constants";
import {TVEvent} from "@/utils/typedefs";

interface Params {
  pageType: Pages;
}

interface Props {
  params: Params
}

export default function Events(props: Props) {
  const { params } = props;
  const { pageType } = params;
  const currentType = ProgramTypeMapper[pageType];

  const fetchedEvents = tvSchedule as unknown as TVEvent[];
  const events = fetchedEvents.filter((event) => event.type === currentType)

  return (
    <div className={styles.page}>
      <header>
        <Navigation
          currentType={currentType}
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
