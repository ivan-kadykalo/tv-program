export interface Event {
  name: string;
  type: ProgramType;
  channel: string;
  time: Date;
}

export enum ProgramType {
  MOVIE = 'MOVIE',
  CARTOON = 'CARTOON',
}

export enum ERRORS {
  FAILED_TO_FETCH_HTML = 'Failed to fetch HTML',
  SCRAPING_FAILED = 'Scraping failed',
}