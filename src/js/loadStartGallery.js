import gallery from '../templates/gallery.hbs';
import API from './apiService';
import transformData from './transformData';
import transformGenres from './transfomGenres';
import { initPagination } from './pagination';

// номер страницы открываемый по умолчанию
let startPage = 1;

// контейнер галлереи
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
  API.getTrendingMovie(page).then(({ page, totalItems, resultsTrending }) => {
    // генерим дату
    transformData(resultsTrending);
    // генерим жанры
    transformGenres(resultsTrending);
    // рендерим на страницу
    loadStartGallery(resultsTrending);

    initPagination({
      page,
      totalItems,
    });
  });
}

// вызов функции рендера галереи при загрузке страницы

dataRequest(startPage);

export { transformData, transformGenres, loadStartGallery, dataRequest };
