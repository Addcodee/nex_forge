import { useMutation } from "@tanstack/react-query";
import { authService } from "auth/services/AuthService";
import { LoginForm } from "auth/types/LoginForm";
import { setCookies } from "shared/lib/cookies/cookies";
import { StatusType } from "shared/lib/types/StatusType";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (loginForm: LoginForm) => {
      const response = await authService.login(loginForm);

      if (response.status === StatusType.SUCCESS) {
        setCookies("TKN", {
          access: response.data.access,
          refresh: response.data.refresh,
        });

        window.location.href = "/clients";
      }

      return response;
    },
  });
};
