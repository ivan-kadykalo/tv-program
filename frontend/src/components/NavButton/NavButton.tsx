import React, {FC} from "react";
import styles from './NavButton.module.scss';
import cn from "classnames";
import { ProgramType } from "@/utils/typedefs";
import { MAP_BUTTON_NAME } from "@/utils/constants";

interface Props {
  currentPageType: ProgramType;
  buttonType: ProgramType;
  handleClick: (programType: ProgramType) => void;
}

const getColorMode: Record<ProgramType, string> = {
  [ProgramType.ALL]: styles.first,
  [ProgramType.MOVIE]: styles.second,
  [ProgramType.CARTOON]: styles.third,
};

export const NavButton: FC<Props> = (props) => {
  const {
    currentPageType,
    buttonType,
    handleClick
  } = props;

  return (
      <button
        onClick={() => handleClick(buttonType)}
        className={cn(
          styles.button,
          getColorMode[buttonType],
          {
            [styles.selected]: currentPageType === buttonType,
          }
        )}
      >
        {MAP_BUTTON_NAME[buttonType]}
      </button>
  )
}