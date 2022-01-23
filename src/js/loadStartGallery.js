import gallery from '../templates/gallery.hbs';
import API from './apiService';
import transformData from './transformData';
import transformGenres from './transfomGenres';

import { pagination } from './pagination';
import { slowScroll } from './slowScroll';

const page = pagination.getCurrentPage();

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
  API.getTrendingMovie(page).then(({totalItems, resultsTrending }) => {
    // генерим дату
    transformData(resultsTrending);
    // генерим жанры
    transformGenres(resultsTrending);
    // подключаем данные к пагинации
    pagination.reset(totalItems);
    // рендерим на страницу
    loadStartGallery(resultsTrending);
  });
}

// вызов функции рендера галереи при загрузке страницы
dataRequest(page);

// вызов пагинации
pagination.on('afterMove', (event) => {
    const currentPage = event.page;
    API.getTrendingMovie(currentPage).then(({resultsTrending }) => {
    transformData(resultsTrending);
    transformGenres(resultsTrending);
    loadStartGallery(resultsTrending);
    slowScroll()
 })})

export { transformData, transformGenres, loadStartGallery, dataRequest };
