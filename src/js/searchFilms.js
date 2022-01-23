import api from "./apiService";
import { transformData,transformGenres,loadStartGallery, } from '../js/loadStartGallery';
import Pagination from 'tui-pagination';
import { slowScroll } from './slowScroll';

let name = '';

const searchFormEl = document.querySelector('.search__form');
const notificationEl = document.querySelector('.notification');

searchFormEl.addEventListener('submit', onSubmit);

// Пагинация
const container = document.getElementById('tui-pagination-container');
const paginationSearch = new Pagination(container, {
  page: 1,
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 5
});
const page = paginationSearch.getCurrentPage();
// =======================================

function onSubmit(e) {
  e.preventDefault()
  const form = e.currentTarget;
  const searchName = form.elements.filmName.value;
   
  const normalizedName = searchName.toLowerCase().trim().split(' ').join('+')
  console.log(normalizedName)
  if (normalizedName.length === 0 || normalizedName === name )  {
  Notify.failure('Same query')
   return
  }
  name = normalizedName

  api.getMovieBySearch(name, page).then(data => {
    const moviesData = data.resultsSearch 
    if (moviesData.length === 0) {
    Notify.failure('Search result not successful. Enter the correct movie name')
}
    transformData(moviesData);
    transformGenres(moviesData);

    // подключаем данные к пагинации
    paginationSearch.reset(data.totalItems);
    
    loadStartGallery(moviesData);

  } ).finally(() => form.reset())
}

// вызов пагинации
paginationSearch.on('afterMove', (event) => {
    const currentPage = event.page;
    api.getMovieBySearch(name, currentPage).then(data => {
    const moviesData = data.resultsSearch 
    transformData(moviesData);
    transformGenres(moviesData);
    loadStartGallery(moviesData);
    slowScroll()
 })})