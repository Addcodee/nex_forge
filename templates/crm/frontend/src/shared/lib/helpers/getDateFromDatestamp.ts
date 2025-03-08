export const getDateFromDatestamp = (dateStamp: Date | null) => {
  if (dateStamp === null) return;

  const date = new Date(dateStamp); // Преобразуем строку в объект Date

  // Извлекаем год, месяц и день
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяц от 0 до 11
  const day = String(date.getDate()).padStart(2, "0");

  // Возвращаем строку в формате yyyy-mm-dd
  return `${year}-${month}-${day}`;
};
