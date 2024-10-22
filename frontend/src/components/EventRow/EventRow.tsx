import React, { FC } from "react";
import styles from "./EventRow.module.scss";
import {
  checkIsDateWasDaysAgo,
  getFormatedDateAndTime,
  getSearchLink,
  checkIsEventNotStarted
} from "@/utils/helpers";
import { TVEvent } from "@/utils/typedefs";
import Link from "next/link";
import cn from "classnames";

interface Props {
  event: TVEvent;
}

export const EventRow: FC<Props> = ({ event }) => {
  const { name, channel, time: dateTime } = event;

  const newDate = new Date(dateTime);
  const { date, time } = getFormatedDateAndTime(newDate);
  const searchLink = getSearchLink(name);
  const isOld = checkIsDateWasDaysAgo(newDate, 10);
  const isEventNotStarted = checkIsEventNotStarted(dateTime);

  return (
    <tr className={cn(styles.row, {
      [styles.old]: isOld,
      [styles.notStarted]: isEventNotStarted
    })}>
      <td className={styles.linkRow}>
        <Link
          href={searchLink}
          target='_blank'
          rel="noreferrer"
          className={styles.link}
        />

        {name}
      </td>

      <td>
        <span className={styles.dateElem}>{date}</span>
        <span className={styles.dateElem}>{time}</span>
      </td>

      <td>{channel}</td>
    </tr>
  );
};
