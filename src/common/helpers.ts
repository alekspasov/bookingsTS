export const dateFormat = (dateToFormat: string): string => {
  const date = new Date(dateToFormat);

  let day: number | string = date.getDate();
  day = day < 10 ? "0" + day : day;
  let month: number | string = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  const year = date.getFullYear();

  const dateString = `${day}/${month}/${year}`;

  return dateString;
};
