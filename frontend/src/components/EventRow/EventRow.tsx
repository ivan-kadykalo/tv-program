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

const getColorMode: Record<ProgramType, string> = {
  [ProgramType.ALL]: styles.first,
  [ProgramType.MOVIE]: styles.second,
  [ProgramType.CARTOON]: styles.third,
};

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
      <td className={cn(getColorMode[pageType], {
        [styles.notStarted]: isEventNotStarted,
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
