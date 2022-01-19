import gallery from '../templates/gallery.hbs';
import API from './apiService';
import transformData from './transformData';
import transformGenres from './transfomGenres';

// номер страницы открываемы по умолчанию
const page = 1;

const galleryList = document.querySelector('.gallery-list');

// функция рендера
function loadStartGallery(data) {
  const markup = gallery(data);

  // предварительно выбрана функция чистого рендера
  // galleryList.insertAdjacentHTML('beforeend', markup);
  galleryList.innerHTML = markup;
}

// функция получения данных с сервера и коррекция даты и жанров
function dataRequest(page) {
  API.getTrendingMovie(page).then(({ resultsTrending }) => {
    // генерим дату
    transformData(resultsTrending);
    // генерим жанры
    transformGenres(resultsTrending);
    // рендерим на страницу
    loadStartGallery(resultsTrending);
  });
}
// вызов функции рендера галереи при загрузке страницы
dataRequest(page);

export { loadStartGallery, dataRequest };
