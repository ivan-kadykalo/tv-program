import React, {FC} from "react";
import styles from './Navigation.module.scss';
import {PagesMapper} from "@/utils/constants";
import cn from "classnames";
import Link from "next/link";
import {ProgramType} from "@/utils/typedefs";

interface Props {
  currentType?: ProgramType;
}

export const Navigation: FC<Props> = (props) => {
  const { currentType } = props;

  const eventTypes = Object.values(ProgramType);

  return (
    <nav className={styles.typesSection}>
      {eventTypes.map((eventType) => (
        <Link
          key={eventType}
          href={PagesMapper[eventType]}
          className={cn(styles.cardWrapper, {
            [styles.selected]: eventType === currentType,
          })}
        >
          {eventType}
        </Link>
      ))}
    </nav>
  )
}