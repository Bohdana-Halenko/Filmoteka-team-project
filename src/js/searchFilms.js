import api from "./apiService";
import { transformData,transformGenres,loadStartGallery, } from '../js/loadStartGallery';

let name = '';
let timeoutId = null;
const searchFormEl = document.querySelector('.search__form');
const notificationEl = document.querySelector('.notification');
console.log(notificationEl)

function showNotification(el, message) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    el.textContent = message;
    el.classList.remove('is-hidden');
    timeoutId = setTimeout(() => {
      el.classList.add('is-hidden');
      setTimeout(() => {
        el.textContent = '';
      }, 500);
    }, 2500);
  };

searchFormEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault()
  const form = e.currentTarget;
  const searchName = form.elements.filmName.value;
   
  
  const normalizedName = searchName.toLowerCase().trim().split(' ').join('+')
  console.log(normalizedName)
  if (normalizedName.length === 0 || normalizedName === name )  {
 showNotification(notificationEl,'Same query')
   return
  }
  name = normalizedName
  api.getMovieBySearch(name, 1).then(data => {
    const moviesData = data.resultsSearch 
    if (moviesData.length === 0) {
      showNotification(notificationEl, 'Search result not successful')
      return
}
    transformData(moviesData);
    transformGenres(moviesData);
    loadStartGallery(moviesData);
  } ).finally(() => form.reset())
}