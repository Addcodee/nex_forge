export const generateRandomPassword = () => {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const symbols = "!";

  const allChars = letters + digits + symbols;
  let password = "";

  // Гарантируем наличие хотя бы одной буквы, цифры и символа
  password += letters[Math.floor(Math.random() * letters.length)];
  password += digits[Math.floor(Math.random() * digits.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // Заполняем оставшиеся символы
  for (let i = password.length; i < 8; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Перемешиваем пароль
  return password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
};
