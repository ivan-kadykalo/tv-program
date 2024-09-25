export interface TvInfo {
  channelName: string;
  time: string;
  date: string;
}

export interface ScrapedData {
  id: string;
  name: string;
  type: ProgramType;
  tvInfo: TvInfo;
}

export enum ProgramType {
  SERIES = 'SERIES',
  MOVIE = 'MOVIE',
  CARTOON = 'CARTOON',
  CARTOON_SERIES = 'CARTOON_SERIES',
}

export enum ERRORS {
  FAILED_TO_FETCH_HTML = 'Failed to fetch HTML',
}