import gallery from '../templates/gallery.hbs';
import API from './apiService';

import transformData from './transformData';
import transformGenres from './transfomGenres';

const galleryList = document.querySelector('.gallery-list');

function loadStartGallery(data) {
  const markup = gallery(data);

  galleryList.insertAdjacentHTML('beforeend', markup);
}

API.getTrendingMovie().then(({ resultsTrending }) => {
  transformData(resultsTrending);
  transformGenres(resultsTrending);
  loadStartGallery(resultsTrending);
});

export { loadStartGallery };
