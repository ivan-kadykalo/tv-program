"use client";

import React, {FC} from "react";
import styles from './Navigation.module.scss';
import { useRouter } from "next/navigation";
import { ProgramType } from "@/utils/typedefs";
import { QUERY_TYPE } from "@/utils/constants";
import { NavButton } from "@/components/NavButton/NavButton";

interface Props {
  pageType: ProgramType;
}

export const Navigation: FC<Props> = (props) => {
  const { pageType } = props;
  const router = useRouter();

  const handleClick = (programType: ProgramType) => {
    router.push(`?${QUERY_TYPE}=${programType}`);
  }

  return (
    <header className={styles.navigation}>
      <div className={styles.contentWrapper}>
        {Object.values(ProgramType).map((type) => (
          <NavButton
            key={type}
            currentPageType={pageType}
            buttonType={type}
            handleClick={handleClick}
          />
        ))}
      </div>
    </header>
  )
}
