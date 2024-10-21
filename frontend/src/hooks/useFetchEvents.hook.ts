import {useEffect, useState} from "react";
import {TVEvent} from "@/utils/typedefs";
import {env} from "next-runtime-env";

interface Output {
  events: TVEvent[];
  loading: boolean;
}

export const useFetchEvents = (): Output => {
  const [events, setEvents] = useState<TVEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const API_HOST = env('NEXT_PUBLIC_API_HOST');
  const API_REST_ENDPOINT = env('NEXT_PUBLIC_API_REST_ENDPOINT');
  const apiUrl = `${API_HOST}${API_REST_ENDPOINT}/events.ts`;

  console.log('🚨Rest API🚨', API_REST_ENDPOINT );
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

  return { events, loading };
}