import {ProgramType} from "@/utils/typedefs";

export const QUERY_TYPE = 'type';
export const SEARCH_LINK_BASE = 'https://www.google.com/search';

export const MAP_PAGE_TITLE: Record<ProgramType, string> = {
  [ProgramType.ALL]: 'Фільми',
  [ProgramType.MOVIE]: 'Мультфільми',
  [ProgramType.CARTOON]: 'Всі програми',
};

export const MAP_BUTTON_NAME: Record<ProgramType, string> = {
  [ProgramType.ALL]: 'Всі',
  [ProgramType.MOVIE]: 'Фільми',
  [ProgramType.CARTOON]: 'Мультфільми',
};