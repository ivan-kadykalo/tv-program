export interface TvInfo {
  channelName: string;
  time: string;
  date: string;
}

export enum ProgramType {
  SERIES = 'SERIES',
  MOVIE = 'MOVIE',
  CARTOON = 'CARTOON',
  CARTOON_SERIES = 'CARTOON_SERIES',
}

export interface TVEvent {
  id: number;
  name: string;
  type: ProgramType;
  tvInfo: TvInfo;
}