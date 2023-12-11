const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const endpoints = {
  categories: `${BASE_API_URL}/categories`,
  games: `${BASE_API_URL}/games`,
  login: `${BASE_API_URL}/login`,
  logout: `${BASE_API_URL}/logout`,
} as const;
