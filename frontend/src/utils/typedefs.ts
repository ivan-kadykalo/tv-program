export enum ProgramType {
  ALL = 'ALL',
  MOVIE = 'MOVIE',
  CARTOON = 'CARTOON',
}

export interface TVEvent {
  id: number;
  name: string;
  type: ProgramType;
  channel: string;
  time: Date;
}