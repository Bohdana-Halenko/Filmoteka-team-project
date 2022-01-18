import gallery from '../templates/gallery.hbs';
import API from './apiService';
import transformData from './transformData';
import transformGenres from './transfomGenres';

// нашли лого
const homeLogo = document.querySelector('.logo__link');

const galleryList = document.querySelector('.gallery-list');

// слушаем нажатие на logo
homeLogo.addEventListener('click', renderClickLogo, false);

// функция рендера
function loadStartGallery(data) {
  const markup = gallery(data);

  // предварительно выбрана функция чистого рендера
  // galleryList.insertAdjacentHTML('beforeend', markup);
  galleryList.innerHTML = markup;
}

// функция получения данных с сервера и коррекция даты и жанров
function dataRequest() {
  API.getTrendingMovie().then(({ resultsTrending }) => {
    transformData(resultsTrending);
    transformGenres(resultsTrending);
    loadStartGallery(resultsTrending);
  });
}
// вызов функции рендера галереи при загрузке страницы
dataRequest();

// функция рендера галереи без перезагрузки страницы
function renderClickLogo(evt) {
  evt.preventDefault();
  dataRequest();
}

export { loadStartGallery };
