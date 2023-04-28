export const convertDateToYears = (date: string) =>
  date
    .split(' – ')
    .map((el) => new Date(el).getFullYear())
    .join(' – ');
