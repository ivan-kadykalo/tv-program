"use client";

import styles from "./EventsTable.module.scss";
import React, { FC } from "react";
import {ProgramType, TVEvent} from "@/utils/typedefs";
import { EventRow } from "@/components/EventRow/EventRow";
import cn from "classnames";

interface Props {
  events: TVEvent[];
  pageType: ProgramType;
}

export const EventsTable: FC<Props> = (props) => {
  const { events, pageType } = props;

  return (
    <table className={cn(styles.table, {
      [styles.first]: pageType === ProgramType.ALL,
      [styles.second]: pageType === ProgramType.MOVIE,
      [styles.third]: pageType === ProgramType.CARTOON,
    })}>
      <thead>
        <tr>
          <th>Назва</th>

          <th>Час</th>

          <th>Канал</th>
        </tr>
      </thead>

      <tbody>
        {events.map((event) => (
          <EventRow
            key={event.id}
            event={event}
            pageType={pageType}
          />
        ))}
      </tbody>
    </table>
  );
};
