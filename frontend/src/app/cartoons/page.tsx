import React, { FC } from "react";
import { EventsTable } from "@/components/EventsTable/EventsTable";
import { ProgramType } from "@/utils/typedefs";
import {fetchEvents} from "@/utils/fetch";

const Page: FC = async () => {
  const events = await fetchEvents(ProgramType.CARTOON);

  return (
    <EventsTable events={events} />
  );
}

export default Page;