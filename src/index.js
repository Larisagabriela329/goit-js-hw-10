import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_Uy7XTboKZ0AGxgDoPSgP6yTdwi4WTukdzxSsOwoW8jQtiOPbI0q207cUniLWi3Z9";

import CatApi from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const catApi = new CatApi();

async function populateBreedSelect() {
  showLoader();
  hideElement(breedSelect);
  hideElement(errorMessage); // Hide error message at the start of each request

  try {
    const breeds = await catApi.fetchBreeds();
    if (breeds.length > 0) {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
      showElement(breedSelect);
    } else {
      throw new Error('No breeds found');
    }
  } catch (error) {
    showElement(errorMessage);
    console.error('Error fetching cat breeds:', error);
  } finally {
    hideLoader();
  }
}

async function displayCatInfo(breedId) {
  showLoader();
  hideElement(catInfoDiv);
  hideElement(errorMessage); // Hide error message at the start of each request

  try {
    const catData = await catApi.fetchCatByBreed(breedId);
    if (catData && catData.breeds && catData.breeds.length > 0) {
      const breed = catData.breeds[0];
      catInfoDiv.innerHTML = `
        <img src="${catData.url}" alt="${breed.name}" style="max-width: 300px;">
        <h3>${breed.name}</h3>
        <p><strong>Description:</strong> ${breed.description}</p>
        <p><strong>Temperament:</strong> ${breed.temperament}</p>
      `;
      showElement(catInfoDiv);
    } else {
      throw new Error('Cat data not available');
    }
  } catch (error) {
    showElement(errorMessage);
    console.error('Error fetching cat information:', error);
  } finally {
    hideLoader();
  }
}

function showLoader() {
  loader.classList.remove('hidden');
  loader.classList.add('visible');
}

function hideLoader() {
  loader.classList.remove('visible');
  loader.classList.add('hidden');
}

function showElement(element) {
  element.classList.remove('hidden');
  element.classList.add('visible');
}

function hideElement(element) {
  element.classList.remove('visible');
  element.classList.add('hidden');
}

breedSelect.addEventListener('change', (event) => {
  const selectedBreedId = event.target.value;
  if (selectedBreedId) {
    displayCatInfo(selectedBreedId);
  }
});

document.addEventListener('DOMContentLoaded', populateBreedSelect);
