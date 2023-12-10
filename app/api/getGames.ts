export const getGames = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/games`);
  const data = await response.json();
  return data;
};
