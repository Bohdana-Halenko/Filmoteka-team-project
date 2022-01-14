import gallery from '../templates/gallery.hbs';

const galleryList = document.querySelector('.gallery-list');

function loadStartGallery(data) {
  const markup = gallery(data);

  galleryList.insertAdjacentHTML('beforeend', markup);
}

console.log(gallery);

// начальный рендер галереи
window.addEventListener('DOMContentLoaded', loadStartGallery);

export { loadStartGallery };
