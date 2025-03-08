import { getCookies } from "../cookies/cookies";
import { Tokens } from "../types/Tokens";

export const TOKENS = getCookies<Tokens>("TKN");

export const WEBSITE_URL = import.meta.env.VITE_APP_WEBSITE_URL;
