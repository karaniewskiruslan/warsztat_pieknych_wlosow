export const dataText = (data: Date) => {
  const day = String(data.getDate()).padStart(2, "0");
  const month = String(data.getMonth()).padStart(2, "0");
  const year = String(data.getFullYear());
  const hour = String(data.getHours()).padStart(2, "0");
  const minutes = String(data.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} - ${hour}:${minutes}`;
};
