import {ProgramType} from "@/utils/typedefs";

export const QUERY_TYPE = 'type';
export const SEARCH_LINK_BASE = 'https://www.google.com/search';

export const MAP_PAGE_TITLE: Record<ProgramType, string> = {
  [ProgramType.ALL]: 'Всі програми',
  [ProgramType.MOVIE]: 'Фільми',
  [ProgramType.CARTOON]: 'Мультфільми',
};

export const MAP_BUTTON_NAME: Record<ProgramType, string> = {
  [ProgramType.ALL]: 'Всі',
  [ProgramType.MOVIE]: 'Фільми',
  [ProgramType.CARTOON]: 'Мультфільми',
};

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const API_REST_ENDPOINT = process.env.NEXT_PUBLIC_API_REST_ENDPOINT;
const EVENTS_REST_ENDPOINT = '/events.ts';
export const EVENTS_API_URL = `${API_HOST}${API_REST_ENDPOINT}/${EVENTS_REST_ENDPOINT}`;
