"use client";

import React, {FC} from "react";
import styles from './Navigation.module.scss';
import cn from "classnames";
import { useRouter } from "next/navigation";
import { ProgramType } from "@/utils/typedefs";
import { QUERY_TYPE } from "@/utils/constants";
import { useGetCurrentPageType } from "@/utils/hooks";

export const Navigation: FC = () => {
  const router = useRouter();
  const pageType = useGetCurrentPageType();

  const handleClick = (programType: ProgramType) => {
    router.push(`?${QUERY_TYPE}=${programType}`);
  }

  return (
    <nav className={styles.navigation}>
      <button
        onClick={() => handleClick(ProgramType.ALL)}
        className={cn(styles.button, styles.first, {
          [styles.selected]: pageType === ProgramType.ALL,
        })}
      >
        Всі
      </button>

      <button
        onClick={() => handleClick(ProgramType.MOVIE)}
        className={cn(styles.button, styles.second, {
          [styles.selected]: pageType === ProgramType.MOVIE,
        })}
      >
        Фільми
      </button>

      <button
        onClick={() => handleClick(ProgramType.CARTOON)}
        className={cn(styles.button, styles.third, {
          [styles.selected]: pageType === ProgramType.CARTOON,
        })}
      >
        Мультфільми
      </button>
    </nav>
  )
}