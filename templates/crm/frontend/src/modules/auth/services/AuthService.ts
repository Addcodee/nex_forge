import "reflect-metadata";
import { BaseApi } from "shared/lib/api/BaseApi";
import { container } from "tsyringe";
import { AxiosError } from "axios";
import ErrorMessages from "shared/lib/consts/errors";
import { emailRegex } from "shared/lib/consts/regex";
import { ResponseType, StatusType } from "shared/lib/types/StatusType";
import { Tokens } from "shared/lib/types/Tokens";
import { LoginForm } from "auth/types/LoginForm";

export class AuthService extends BaseApi {
  constructor() {
    super();
  }

  async login(loginForm: LoginForm): Promise<ResponseType<Tokens>> {
    if (!loginForm.email.trim()) {
      return {
        status: StatusType.ERROR,
        error: ErrorMessages.EmptyEmail,
      };
    }

    if (!loginForm.password.trim()) {
      return {
        status: StatusType.ERROR,
        error: ErrorMessages.EmptyPassword,
      };
    }

    if (!emailRegex.test(loginForm.email)) {
      return {
        status: StatusType.ERROR,
        error: ErrorMessages.InvalidEmail,
      };
    }

    try {
      const res = await this.post("auth/login", loginForm);

      return {
        status: StatusType.SUCCESS,
        data: res.data,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          return {
            status: StatusType.ERROR,
            error: ErrorMessages.WrongCredentials,
          };
        }
      }

      return {
        status: StatusType.ERROR,
        error: ErrorMessages.UnexpectedError,
      };
    }
  }
}

export const authService = container.resolve(AuthService);
