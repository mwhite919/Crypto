export function convertUnixToDate(time) {
  const date = new Date(time);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
}
