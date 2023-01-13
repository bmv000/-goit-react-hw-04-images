import axios from 'axios';


const imagesAPI = axios.create({
  baseURL: 'https://pixabay.com/api',
});
const API_KEY = '31491634-f9e5a76d496e450b9a690dee6';

export const fetchImages = async (searchQuery, searchPage = 1) => {
  const response = await imagesAPI.get(
    '/?image_type=photo&orientation=horizontal',
    {
      params: {
        q: searchQuery,
        page: searchPage,
        key: API_KEY,
        per_page: 12,
      },
    }
  );

  return response.data.hits;
};
const api = {
  fetchImages,
};

export default api;