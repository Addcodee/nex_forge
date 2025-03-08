export const prettifyDate = ({
  date,
  hasYear = false,
}: {
  date: string;
  hasYear?: boolean;
}) => {
  const currentDate = new Date();

  const todayStr = currentDate.toISOString().split("T")[0];
  const inputDateStr = date.slice(0, 10);

  if (todayStr === inputDateStr) return "Сегодня";

  const dayMonth = `${date.slice(8, 10)}.${date.slice(5, 7)}`;
  return hasYear ? `${dayMonth}.${date.slice(0, 4)}` : dayMonth;
};
