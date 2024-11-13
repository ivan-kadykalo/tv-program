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

const getColorMode: Record<ProgramType, string> = {
  [ProgramType.ALL]: styles.first,
  [ProgramType.MOVIE]: styles.second,
  [ProgramType.CARTOON]: styles.third,
};

export const EventsTable: FC<Props> = (props) => {
  const {
    events,
    pageType,
  } = props;

  return (
    <table className={cn(styles.table, getColorMode[pageType])}>
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
