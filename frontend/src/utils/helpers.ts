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
    default:
      return '';
  }
}

export const checkIsDateWasDaysAgo = (targetDate: Date, daysAgo: number): boolean => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - daysAgo);

  return targetDate <= sevenDaysAgo;
}

export const getFormatedDateAndTime = (timestamp: Date) => {
  const dayMonthFormatter = new Intl.DateTimeFormat('uk-UA', {
    day: 'numeric',
    month: 'short'
  });

  const timeFormatter = new Intl.DateTimeFormat('uk-UA', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const formattedDayMonth = dayMonthFormatter.format(timestamp);
  const formattedTime = timeFormatter.format(timestamp);

  return {
    date: formattedDayMonth,
    time: formattedTime,
  };
}

export const isEventInCurrentHour = (date: Date): boolean => {
  const eventDate = new Date(date);
  const currentTime = new Date();

  const eventHour = eventDate.getHours();
  const currentHour = currentTime.getHours();

  const isSameDay = eventDate.toDateString() === currentTime.toDateString();

  return isSameDay && Math.abs(currentHour - eventHour) < 1;
};