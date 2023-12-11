import { addHeaders, fetchData } from './fetcher';

export const getCategories = async () => {
  try {
    const data = await fetchData('categories', {
      method: 'GET',
      headers: addHeaders(),
    });
    return data;
  } catch (error) {
    console.error('Error while fetching categories', error);
    throw error;
  }
};
