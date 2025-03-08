export enum ErrorMessages {
  EmptyEmail = "Введите электронную почту!",
  EmptyPassword = "Введите пароль!",
  InvalidEmail = "Введите действительную электронную почту!",
  WrongCredentials = "Неправильная почта или пароль",

  ServerError = "Ошибка: сервер вернул ошибку, статус код:",
  UnexpectedError = "Произошла непредвиденная ошибка, повторите попытку немного позже",
}

export default ErrorMessages;
