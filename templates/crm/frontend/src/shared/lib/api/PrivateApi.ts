import "reflect-metadata";
import { container } from "tsyringe";
import { BaseApi } from "./BaseApi";
import { Tokens } from "shared/lib/types";
import { getCookies, setCookies } from "shared/lib/cookies";

export class PrivateApi extends BaseApi {
  constructor() {
    super();

    this.axios.interceptors.request.use(async (config) => {
      const TOKENS = getCookies<Tokens>("TKN");
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
    const TOKENS = getCookies<Tokens>("TKN");
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
