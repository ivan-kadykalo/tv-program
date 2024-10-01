export interface TvInfo {
  channelName: string;
  time: string;
  date: string;
}

export interface Event {
  name: string;
  type: ProgramType;
  channel: string;
  time: Date;
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