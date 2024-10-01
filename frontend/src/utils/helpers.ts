import {ProgramType} from "@/utils/typedefs";

export const getSearchLink = (name: string) => (
  `https://www.google.com/search?q=${name.replaceAll(' ', '+')}+онлайн+українською`
);

export const getTabName= (type: ProgramType) => {
  switch (type) {
    case ProgramType.MOVIE:
      return 'Фільми';
    case ProgramType.CARTOON:
      return 'Мультфільми';
    case ProgramType.SERIES:
      return 'Серіали';
    case ProgramType.CARTOON_SERIES:
      return 'Мультсеріали';
    default:
      return '';
  }
}