"use client";

import React, {FC} from "react";
import styles from './Navigation.module.scss';
import cn from "classnames";
import Link from "next/link";
import { ROUTES } from "@/utils/routes";
import { usePathname } from "next/navigation";

export const Navigation: FC = () => {

  const activeRoute = usePathname();

  return (
    <nav className={styles.navigation}>
      <Link
        href={ROUTES.MOVIES}
        className={cn(styles.button, {
          [styles.selected]: activeRoute === ROUTES.MOVIES,
        })}
      >
        Фільми
      </Link>

      <Link
        href={ROUTES.CARTOONS}
        className={cn(styles.button, {
          [styles.selected]: activeRoute === ROUTES.CARTOONS,
        })}
      >
        Мультфільми
      </Link>
    </nav>
  )
}