import ResponseError from '../config/ResponseError';

export const fetchData = async (url: string, options?: RequestInit) => {
  const response = await fetch(import.meta.env.VITE_API_URL + url, options);
  if (!response.ok) {
    throw new ResponseError('Bad request from fetchData.ts!', response);
  }
  return response;
};
