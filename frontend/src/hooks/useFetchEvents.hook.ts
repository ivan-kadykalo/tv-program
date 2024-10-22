import {useEffect, useState} from "react";
import {ProgramType, TVEvent} from "@/utils/typedefs";

interface Output {
  events: TVEvent[];
  loading: boolean;
}

// FALLBACK FOR LOCAL
const eventsFallback = [
  {
    id: 5883,
    name: "Південний парк, 3 сезон, 10 с",
    time: new Date("2024-10-22T06:55:00.000Z"),
    channel: "Paramount Comedy",
    type: ProgramType.MOVIE
  },
  {
    "id": 5909,
    "name": "Агенти справедливості, 1 сезон, 13 с. Смерть у весільній сукні",
    "time": new Date('2024-10-21T23:50:00.000Z'),
    "channel": "ТВІЙ СЕРІАЛ",
    "type": ProgramType.CARTOON
  },
]

export const useFetchEvents = (): Output => {
  const [events, setEvents] = useState<TVEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const ENV = process.env.NEXT_PUBLIC_ENV;
  const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
  const API_REST_ENDPOINT = process.env.NEXT_PUBLIC_API_REST_ENDPOINT;

  console.log('🚨🚨🚨', ENV, API_HOST, API_REST_ENDPOINT);

  const isDevelopment = ENV === 'development';

  const apiUrl = isDevelopment
    ? `${API_HOST}${API_REST_ENDPOINT}/events.ts`
    : `/api/src/rest/events.ts`;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(apiUrl);

        setEvents(await response.json());

        setLoading(false);
      } catch (error) {
        console.log('🚨', 'Error while fetching events:', error);
      }
    }

    fetchEvents();
  }, [apiUrl]);

  if (isDevelopment) {
    return { events: eventsFallback, loading: false };
  }

  return { events, loading };
}