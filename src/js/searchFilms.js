import api from "./apiService";
import { transformData, transformGenres, loadStartGallery, } from '../js/loadStartGallery';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let name = '';

const searchFormEl = document.querySelector('.search__form');
const notificationEl = document.querySelector('.notification');


searchFormEl.addEventListener('submit', onSubmit);

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
  api.getMovieBySearch(name, 1).then(data => {
    const moviesData = data.resultsSearch 
    if (moviesData.length === 0) {
     Notify.failure('Search result not successful. Enter the correct movie name')
}
    transformData(moviesData);
    transformGenres(moviesData);
    loadStartGallery(moviesData);
  } ).finally(() => form.reset())
}