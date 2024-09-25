import React, {FC} from "react";
import styles from './Navigation.module.scss';
import cn from "classnames";
import {ProgramType} from "@/utils/typedefs";

interface Props {
  programType: ProgramType;
  setProgramType: (type: ProgramType) => void;
}

export const Navigation: FC<Props> = (props) => {
  const { programType, setProgramType } = props;

  const programTypes = Object.values(ProgramType);

  return (
    <nav className={styles.typesSection}>
      {programTypes.map((type) => (
        <button
          key={type}
          onClick={() => setProgramType(type)}
          className={cn(styles.cardWrapper, {
            [styles.selected]: type === programType,
          })}
        >
          {type}
        </button>
      ))}
    </nav>
  )
}