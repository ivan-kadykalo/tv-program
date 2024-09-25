import React, { FC } from "react";
import styles from "./EventRow.module.scss";
import { getSearchLink } from "@/utils/helpers";
import { TVEvent } from "@/utils/typedefs";
import Link from "next/link";

interface Props {
  event: TVEvent;
}

export const EventRow: FC<Props> = ({ event }) => {
  const { name, tvInfo } = event;
  const { channelName, time, date } = tvInfo;

  const searchLink = getSearchLink(name);

  return (
    <tr className={styles.row}>
      <td>{name}</td>

      <td className={styles.searchLink}>
        <Link href={searchLink} target='_blank' rel="noreferrer">
          Search
        </Link>
      </td>

      <td>{channelName}</td>

      <td>{date}</td>

      <td>{time}</td>
    </tr>
  );
};
