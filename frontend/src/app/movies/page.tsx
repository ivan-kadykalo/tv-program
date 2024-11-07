import React, { FC } from "react";
import { EventsTable } from "@/components/EventsTable/EventsTable";
import { ProgramType } from "@/utils/typedefs";
import {fetchEvents} from "@/utils/fetch";

const Page: FC = async () => {
  const events = await fetchEvents(ProgramType.MOVIE);

  return (
    <div>
      <h1>Movies</h1>

      <EventsTable events={events} />
    </div>
  );
}

export default Page;