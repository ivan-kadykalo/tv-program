import styles from "./EventsTable.module.scss";
import React, { FC } from "react";
import { TVEvent } from "@/utils/typedefs";
import { EventRow } from "@/components/EventRow/EventRow";

interface Props {
  events: TVEvent[];
}

export const EventsTable: FC<Props> = ({ events }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Назва</th>

            <th>Пошук</th>

            <th>Канал</th>

            <th>Дата</th>

            <th>Час</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
