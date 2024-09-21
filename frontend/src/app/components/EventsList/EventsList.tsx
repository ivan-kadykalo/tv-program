import styles from "@/app/style/page.module.scss";
import {Event} from "@/app/components/Event/Event";
import React, {FC} from "react";
import { TVEvent } from "@/app/components/Event/Event.typedefs";

interface Props {
  events: TVEvent[];
}

export const EventsList: FC<Props> = (props) => {
  const { events } = props;

  return (
    <div className={styles.grid}>
      <ol>
        {events.map((event) => (
          <div key={event.id}>
            <Event event={event}/>
          </div>
        ))}
      </ol>
    </div>
  )
}