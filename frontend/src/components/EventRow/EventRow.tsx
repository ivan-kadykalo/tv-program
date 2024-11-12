import React, { FC } from "react";
import styles from "./EventRow.module.scss";
import {
  getFormatedDateAndTime,
  getSearchLink,
  checkIsEventNotStarted
} from "@/utils/helpers";
import {ProgramType, TVEvent} from "@/utils/typedefs";
import cn from "classnames";

interface Props {
  event: TVEvent;
  pageType: ProgramType;
}

export const EventRow: FC<Props> = ({ event, pageType }) => {
  const { name, channel, time: dateTime } = event;

  const newDate = new Date(dateTime);
  const { date, time } = getFormatedDateAndTime(newDate);
  const searchLink = getSearchLink(name);
  const isEventNotStarted = checkIsEventNotStarted(dateTime);

  const handleRowClick = () => {
    window.open(searchLink, '_blank');
  };

  return (
    <tr
      onClick={handleRowClick}
      className={styles.row}
    >
      <td className={cn({
        [styles.notStarted]: isEventNotStarted,
        [styles.first]: pageType === ProgramType.ALL,
        [styles.second]: pageType === ProgramType.MOVIE,
        [styles.third]: pageType === ProgramType.CARTOON,
      })}>
        {name}
      </td>

      <td>
        <span className={styles.dateElem}>{date}</span>
        <span className={styles.dateElem}>{time}</span>
      </td>

      <td>
        {channel}
      </td>
    </tr>
  );
};
