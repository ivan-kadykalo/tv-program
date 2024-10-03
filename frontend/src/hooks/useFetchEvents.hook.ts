import {useEffect, useState} from "react";
import {TVEvent} from "@/utils/typedefs";

interface Output {
  events: TVEvent[];
  loading: boolean;
}

export const useFetchEvents = (): Output => {
  const [events, setEvents] = useState<TVEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/src/events.ts');

        setEvents(await response.json());
        setLoading(false);
      } catch (error) {
        console.log('🚨', 'Error while fetching events:', error);
      }
    }

    fetchEvents();
  }, []);

  return { events, loading };
}