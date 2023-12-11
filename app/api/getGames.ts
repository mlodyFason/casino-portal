import { addHeaders, fetchData } from './fetcher';

export const getGames = async () => {
  try {
    const data = await fetchData('games', {
      method: 'GET',
      headers: addHeaders(),
    });
    return data;
  } catch (error) {
    console.error('Error while fetching games', error);
    throw error;
  }
};
