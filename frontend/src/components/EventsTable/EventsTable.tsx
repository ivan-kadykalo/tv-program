"use client";

import styles from "./EventsTable.module.scss";
import React, { FC } from "react";
import {ProgramType, TVEvent} from "@/utils/typedefs";
import { EventRow } from "@/components/EventRow/EventRow";
import cn from "classnames";
import {useGetCurrentPageType} from "@/utils/hooks";

interface Props {
  events: TVEvent[];
}

export const EventsTable: FC<Props> = ({ events }) => {
  const pageType = useGetCurrentPageType();

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
