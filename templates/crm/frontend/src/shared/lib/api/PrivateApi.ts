import "reflect-metadata";
import { container } from "tsyringe";
import { BaseApi } from "./BaseApi";
import { TOKENS } from "../consts/consts";
import { Tokens } from "../types/Tokens";
import { setCookies } from "../cookies/cookies";

export class PrivateApi extends BaseApi {
  constructor() {
    super();

    this.axios.interceptors.request.use(async (config) => {
      if (!TOKENS) {
        window.location.href = "/login";
        return Promise.reject("No tokens found, redirecting to login");
      }

      config.headers.Authorization = `Bearer ${TOKENS.access}`;
      return config;
    });

    this.axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await this.refreshToken();
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken.access}`;

              return this.axios(originalRequest);
            } else {
              window.location.href = "/login";
            }
          } catch (refreshError) {
            console.error("Failed to refresh token:", refreshError);
            window.location.href = "/login";
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private async refreshToken(): Promise<Tokens | null> {
    try {
      if (TOKENS === undefined) {
        window.location.href = "/login";

        return null;
      }

      const response = await this.post("/auth/refresh", {
        refresh: TOKENS.refresh,
      });

      setCookies("TKN", {
        access: response.data.access,
        refresh: response.data.refresh,
      });

      const { access, refresh } = response.data;

      return { access, refresh };
    } catch (error) {
      return null;
    }
  }
}

export const privateApiService = container.resolve(PrivateApi);
