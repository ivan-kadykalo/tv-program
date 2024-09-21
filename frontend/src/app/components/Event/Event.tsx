import React, {FC} from 'react';
import { TVEvent } from "@/app/components/Event/Event.typedefs";
import styles from './Event.module.scss';

interface Props {
  event: TVEvent;
}

export const Event: FC<Props> = ({ event }) => {
  const {
    name,
    tvInfo,
  } = event;

  const {
    channelName,
    time,
    date,
  } = tvInfo;

  const searchLink = `https://www.google.com/search?q=${name.replaceAll(' ', '+')}+онлайн+українською`;

  return (
    <div className={styles.wrapper}>
      <p>
        {name}
      </p>

      <button className={styles.tvButton}>
        TV info

        <div className={styles.tvInfo}>
          <span>
            {channelName}
          </span>

          <span>
            {date}
          </span>

          <span>
            {time}
          </span>
        </div>
      </button>

      <div>
        <a target='_blank' href={searchLink}>
          Search on Google
        </a>
      </div>
    </div>
  );
}