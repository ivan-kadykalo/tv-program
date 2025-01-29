import { useEffect, useState } from 'react';
import { ProgramType, TVEvent } from '@/utils/typedefs';
import { useSearchParams } from "next/navigation";
import { QUERY_TYPE } from "@/utils/constants";

interface Output {
  events: TVEvent[];
  loading: boolean;
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const API_REST_ENDPOINT = process.env.NEXT_PUBLIC_API_REST_ENDPOINT;
const apiUrl = `${API_HOST}${API_REST_ENDPOINT}/events.ts`;

export const useEvents = (pageType: ProgramType): Output => {
  const [events, setEvents] = useState<TVEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);

      try {
        const response = await fetch(apiUrl);
        const fetchedEvents = await response.json();

        setEvents(fetchedEvents);
      } catch (error) {
        console.error('🚨 Error while fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    if (pageType === ProgramType.ALL) {
      return true;
    }

    return event.type === pageType;
  });

  return {
    events: filteredEvents,
    loading
  };
};

export const useGetCurrentPageType = (): ProgramType => {
  const searchParams = useSearchParams();
  const activeType = searchParams.get(QUERY_TYPE) || ProgramType.ALL;

  return activeType as ProgramType;
}