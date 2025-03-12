export enum ErrorMessages {
  EmptyEmail = "Введите электронную почту!",
  EmptyPassword = "Введите пароль!",
  InvalidEmail = "Введите действительную электронную почту!",
  WrongCredentials = "Неправильная почта или пароль",

  ServerError = "Ошибка на стороне сервера, статус код:",
  UnexpectedError = "Произошла непредвиденная ошибка, повторите попытку немного позже",

  NoIdFound = "ID не найден",
}

export default ErrorMessages;
