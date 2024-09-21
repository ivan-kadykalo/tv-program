import React, {FC} from "react";
import {ProgramType} from "@/app/components/Event/Event.typedefs";
import {EventTypeCard} from "@/app/components/EventTypeCard/EventTypeCard";
import styles from './EventTypesSection.module.scss';

interface Props {
  selectedType: ProgramType;
  onTypeSelect: (type: ProgramType) => void;
}

export const EventTypesSection: FC<Props> = (props) => {
  const { selectedType, onTypeSelect } = props;

  const eventTypes = Object.values(ProgramType);

  return (
    <div className={styles.typesSection}>
      {eventTypes.map((eventType) => (
        <EventTypeCard
          type={eventType}
          selectedType={selectedType}
          onTypeSelect={onTypeSelect}
        />
      ))}
    </div>
  )
}