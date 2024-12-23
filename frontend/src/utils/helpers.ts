import {SEARCH_LINK_BASE} from "@/utils/constants";

export const getSearchLink = (name: string) => (
  `${SEARCH_LINK_BASE}?q=${name.replaceAll(' ', '+')}+онлайн+українською`
);

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

export const checkIsEventNotStarted = (date: Date): boolean => {
  const eventDate = new Date(date);
  const currentTime = new Date();

  return eventDate > currentTime;
};
