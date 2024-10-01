export enum ProgramType {
  MOVIE = 'MOVIE',
  CARTOON = 'CARTOON',
  CARTOON_SERIES = 'CARTOON_SERIES',
  SERIES = 'SERIES',
}

export interface TVEvent {
  id: number;
  name: string;
  type: ProgramType;
  channel: string;
  time: Date;
}