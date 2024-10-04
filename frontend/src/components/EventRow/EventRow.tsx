import React, { FC } from "react";
import styles from "./EventRow.module.scss";
import {checkIsDateWasDaysAgo, getSearchLink} from "@/utils/helpers";
import { TVEvent } from "@/utils/typedefs";
import Link from "next/link";
import cn from "classnames";

interface Props {
  event: TVEvent;
}

export const EventRow: FC<Props> = ({ event }) => {
  const { name, channel, time: dateTime } = event;

  const newDate = new Date(dateTime);
  const date = newDate.toLocaleDateString();
  const time = newDate.toLocaleTimeString();

  const searchLink = getSearchLink(name);

  const isOld = checkIsDateWasDaysAgo(newDate, 7);

  return (
    <tr className={cn(styles.row, {
      [styles.old]: isOld
    })}>
      <td>{name}</td>

      <td className={styles.searchLink}>
        <Link href={searchLink} target='_blank' rel="noreferrer">
          Search
        </Link>
      </td>

      <td>{channel}</td>

      <td>{date}</td>

      <td>{time}</td>
    </tr>
  );
};
