const ENDPOINT = 'https://api.thecatapi.com/v1/breeds';
const IMAGE_SEARCH_ENDPOINT = 'https://api.thecatapi.com/v1/images/search';
const API_KEY = 'live_Uy7XTboKZ0AGxgDoPSgP6yTdwi4WTukdzxSsOwoW8jQtiOPbI0q207cUniLWi3Z9';

export default class CatApi {
  async fetchBreeds() {
    const url = `${ENDPOINT}`;
    const headers = API_KEY ? { 'x-api-key': API_KEY } : {};

    try {
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const breeds = await response.json();
      return breeds;
    } catch (error) {
      console.error('Error fetching cat breeds:', error);
      return [];
    }
  }

  async fetchCatByBreed(breedId) {
    const url = `${IMAGE_SEARCH_ENDPOINT}?breed_ids=${breedId}`;
    const headers = API_KEY ? { 'x-api-key': API_KEY } : {};

    try {
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const catData = await response.json();
      return catData[0]; 
    } catch (error) {
      console.error('Error fetching cat information:', error);
      return null;
    }
  }
}
