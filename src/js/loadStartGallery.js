import gallery from '../templates/gallery.hbs';
import API from './apiService';

const galleryList = document.querySelector('.gallery-list');

function loadStartGallery(data) {
  const markup = gallery(data);

  galleryList.insertAdjacentHTML('beforeend', markup);
}

API.getTrendingMovie().then(({ resultsTrending }) => {
  loadStartGallery(resultsTrending);
});
// console.log(gallery);

// начальный рендер галереи - дает баг в отрисовке первой карточки
// window.addEventListener('DOMContentLoaded', loadStartGallery);

export { loadStartGallery };
