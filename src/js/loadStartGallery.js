import gallery from '../templates/gallery.hbs';
import API from './apiService';
import transformData from './transformData';
import transformGenres from './transfomGenres';

// номер страницы открываемы по умолчанию

const galleryList = document.querySelector('.gallery-list');

// функция рендера
function loadStartGallery(data) {
  const markup = gallery(data);

  // предварительно выбрана функция чистого рендера
  // galleryList.insertAdjacentHTML('beforeend', markup);
  galleryList.innerHTML = markup;
}

// функция получения данных с сервера и коррекция даты и жанров
function dataRequest() {
  API.getTrendingMovie()
    .then(({ resultsTrending }) => {
      // генерим дату
      transformData(resultsTrending);
      // генерим жанры
      transformGenres(resultsTrending);
      // рендерим на страницу
      loadStartGallery(resultsTrending);
    })
    .catch(error => console.error(error.message));
}
// вызов функции рендера галереи при загрузке страницы
dataRequest();

export { loadStartGallery, dataRequest };
