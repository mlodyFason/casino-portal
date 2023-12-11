import { endpoints } from './endpoints';

export const addHeaders = (headers?: HeadersInit): HeadersInit => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  return {
    ...defaultHeaders,
    ...headers,
  };
};

export const fetchData = async (
  endpointKey: keyof typeof endpoints,
  options?: RequestInit,
) => {
  const url = endpoints[endpointKey];

  if (!url) {
    throw new Error(`Endpoint key '${endpointKey}' not found`);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error during fetch', error);
    throw error;
  }
};
