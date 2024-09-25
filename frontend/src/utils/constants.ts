import {ProgramType} from "@/utils/typedefs";

export enum Pages {
  SERIES = 'series',
  MOVIES = 'movies',
  CARTOONS = 'cartoons',
  CARTOON_SERIES = 'cartoon-series',
}
export const PagesMapper = {
  [ProgramType.SERIES]: Pages.SERIES,
  [ProgramType.MOVIE]: Pages.MOVIES,
  [ProgramType.CARTOON]: Pages.CARTOONS,
  [ProgramType.CARTOON_SERIES]: Pages.CARTOON_SERIES,
}

export const ProgramTypeMapper: Record<Pages, ProgramType> = Object.entries(PagesMapper)
  .reduce((acc, [key, value]) => {
    acc[value] = key as ProgramType;
    return acc;
  }, {} as Record<Pages, ProgramType>);

