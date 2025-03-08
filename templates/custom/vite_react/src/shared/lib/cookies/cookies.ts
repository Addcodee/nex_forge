import Cookies from "js-cookie";

export function getCookies<T>(key: string): T | undefined {
  const cookie = Cookies.get(key);

  if (cookie === undefined) return undefined;

  return JSON.parse(cookie);
}

export function setCookies(key: string, data: any) {
  Cookies.set(key, JSON.stringify(data), { expires: 3 });
}

export function removeCookies(key: string) {
  Cookies.remove(key);
}
