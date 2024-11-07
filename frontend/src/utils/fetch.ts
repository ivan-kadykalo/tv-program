import {ProgramType, TVEvent} from "@/utils/typedefs";

export const fetchEvents = async (programType: ProgramType) => {
  const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
  const API_REST_ENDPOINT = process.env.NEXT_PUBLIC_API_REST_ENDPOINT;
  const apiUrl = `${API_HOST}${API_REST_ENDPOINT}/events.ts`;

  let events: TVEvent[] | any[] = [];

  try {
    const response = await fetch(apiUrl, { cache: 'no-store' });

    events = await response.json();
  } catch (error) {
    console.error('🚨', 'Error while fetching events:', error);
  }

  // TODO: fetch needed type instead of filtering
  return events.filter((event: TVEvent) => event.type === programType);
}