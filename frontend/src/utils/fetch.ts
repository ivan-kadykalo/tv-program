import {ProgramType, TVEvent} from "@/utils/typedefs";

export const fetchEvents = async (programType?: ProgramType) => {
  const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
  const API_REST_ENDPOINT = process.env.NEXT_PUBLIC_API_REST_ENDPOINT;
  const apiUrlBase = `${API_HOST}${API_REST_ENDPOINT}/events.ts`;

  const queryParams = programType
    ? `?type=${programType}`
    : '';
  const apiUrl = `${apiUrlBase}${queryParams}`;

  let events: TVEvent[] = [];

  try {
    const response = await fetch(apiUrl, { cache: 'no-store' });

    events = await response.json();
  } catch (error) {
    console.error('🚨', 'Error while fetching events:', error);
  }

  return events;
}