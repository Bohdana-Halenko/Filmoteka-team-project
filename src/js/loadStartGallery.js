import gallery from '../templates/gallery.hbs';
import API from './apiService';

const galleryList = document.querySelector('.gallery-list');

function loadStartGallery(data) {
  const markup = gallery(data);

  galleryList.insertAdjacentHTML('beforeend', markup);
}

API.getTrendingMovie(1).then(({ resultsTranding }) => {
  loadStartGallery(resultsTranding);
});
// console.log(gallery);

// начальный рендер галереи
window.addEventListener('DOMContentLoaded', loadStartGallery);

export { loadStartGallery };
