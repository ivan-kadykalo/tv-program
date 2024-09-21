import React, {FC, useCallback} from "react";
import {ProgramType} from "@/app/components/Event/Event.typedefs";
import styles from './EventTypeCard.module.scss';
import cn from 'classnames';

interface Props {
  type: ProgramType;
  selectedType: ProgramType;
  onTypeSelect: (type: ProgramType) => void;
}

export const EventTypeCard: FC<Props> = (props) => {
  const { type, onTypeSelect, selectedType } = props;

  const handleOnClick = useCallback(() => {
    onTypeSelect(type);
  }, [])

  return (
    <button
      className={cn(styles.cardWrapper, {
        [styles.selected]: selectedType === type,
      })}
      onClick={handleOnClick}
    >
      {type}
    </button>
  );
}