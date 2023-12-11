import { addHeaders, fetchData } from './fetcher';

export const logoutUser = async (username: string) => {
  try {
    const data = await fetchData('logout', {
      method: 'POST',
      headers: addHeaders(),
      body: JSON.stringify({ username }),
    });

    return data;
  } catch (error) {
    console.error('Error during logout', error);
    throw error;
  }
};
