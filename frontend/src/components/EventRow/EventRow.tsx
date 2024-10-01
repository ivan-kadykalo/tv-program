import React, { FC } from "react";
import styles from "./EventRow.module.scss";
import { getSearchLink } from "@/utils/helpers";
import { TVEvent } from "@/utils/typedefs";
import Link from "next/link";

interface Props {
  event: TVEvent;
}

export const EventRow: FC<Props> = ({ event }) => {
  const { name, channel, time: dateTime } = event;

  const newDate = new Date(dateTime);
  const date = newDate.toLocaleDateString();
  const time = newDate.toLocaleTimeString();

  const searchLink = getSearchLink(name);

  return (
    <tr className={styles.row}>
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
