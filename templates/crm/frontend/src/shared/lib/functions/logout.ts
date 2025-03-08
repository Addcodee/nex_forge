import { removeCookies } from "shared/lib/cookies/cookies";

export const logout = () => {
  removeCookies("TKN");
  window.location.href = "/login";
};
