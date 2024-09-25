export const getSearchLink = (name: string) => (
  `https://www.google.com/search?q=${name.replaceAll(' ', '+')}+онлайн+українською`
);
