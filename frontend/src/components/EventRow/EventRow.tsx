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
  // get time and date separately
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString();

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
