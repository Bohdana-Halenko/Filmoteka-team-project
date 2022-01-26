import gallery from '../templates/gallery.hbs';
import API from './apiService';
import transformData from './transformData';
import transformGenres from './transfomGenres';

import { pagination } from './pagination';
import { slowScroll } from './slowScroll';

const page = pagination.getCurrentPage();

// контейнер галлереи
const galleryList = document.querySelector('.gallery-list');
// контейнер пагинации
const container = document.getElementById('tui-pagination-container');

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
    container.classList.remove("is-hidden");
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

function noSaved() {
  const markup = `<p class="library__title">You have not added anything to your library yet.</p>
  <img class="library__image" src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  alt="Movies posters">`;
  galleryList.innerHTML = markup;
  container.classList.add("is-hidden");
}

function noPagination() {
  container.classList.add("is-hidden");
}
 
export { transformData, transformGenres, loadStartGallery, dataRequest, noSaved, noPagination };
