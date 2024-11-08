import React from "react";
import { EventsTable } from "@/components/EventsTable/EventsTable";
import { ProgramType } from "@/utils/typedefs";
import { fetchEvents } from "@/utils/fetch";

const Page = async () => {
  const events = await fetchEvents(ProgramType.MOVIE);

  return (
    <EventsTable events={events} />
  );
}

export default Page;