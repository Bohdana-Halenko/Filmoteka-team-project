import modalCardTpl from '../templates/modal-card.hbs';
import API from './apiService';
import * as basicLightbox from 'basiclightbox';

// =========================================================
const galleryList = document.querySelector('.gallery-list');
const modalCard = document.querySelector('.modal-card');
// ==========================================================

galleryList.addEventListener('click', clickOnMovie);

function clickOnMovie(e) {
    if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'H2') {
      return;
    }
  let movieId = e.target.dataset.id;
  
  API.getMovieDetails(movieId)
    .then((res) => {
      renderModalCard(res);
    })
    
  API.getTrailerKey(movieId)
    .then((key) => {
      let trailerKey = key;
      localStorage.setItem("trailer-key", trailerKey);
    }) 
}

function renderModalCard(res) {
  const markup = modalCardTpl(res);
  modalCard.innerHTML = markup;
  modalCard.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  // Определяем переменные после отрисовки модального окна
  const modalBackdrop = document.querySelector('.modal__backdrop');
  const closeButton = document.querySelector('.close-button')
  const btnWatchTrailer = document.querySelector('.btn__trailer');
  const btnAddToWatched = document.querySelector('.btn__watch');
  const btnAddToQueue = document.querySelector('.btn__queue');

  // Добавляем Listeners
  modalBackdrop.addEventListener('click', modalClose);
  closeButton.addEventListener('click', modalClose);
  btnWatchTrailer.addEventListener('click', onTrailerBtnClick);
  btnAddToWatched.addEventListener('click', addToWatched);
  btnAddToQueue.addEventListener('click', addToQueue);
  window.addEventListener('keydown', modalCloseByEsc);

}

// Функции закрытия модального окна
function modalClose() {
  modalCard.classList.remove('is-open');
  document.body.style.overflow = '';
  window.removeEventListener('keydown', modalCloseByEsc);
  localStorage.removeItem("key");
}

function modalCloseByEsc(e) {
  if (e.code === 'Escape') {
    modalClose();
  }
}

// Функция открытия трейлера
function onTrailerBtnClick(e) {
    let trailerKey = localStorage.getItem("key")
    const trailer = basicLightbox
      .create(
        `<iframe width="300" height="300" src='https://www.youtube.com/embed/${trailerKey}'frameborder="0" allowfullscreen class="trailer"></iframe>`,
      )
    .show();
  }

// определим массивы для хранения
let arrayOfWatched = [];
let arrayOfQueue = [];

if (localStorage.getItem('arrayOfWatched') !== null) {
  arrayOfWatched = localStorage.getItem('arrayOfWatched');
  arrayOfWatched = JSON.parse(arrayOfWatched);
}

if (localStorage.getItem('arrayOfQueue') !== null) {
  arrayOfQueue = localStorage.getItem('arrayOfQueue');
  arrayOfQueue = JSON.parse(arrayOfQueue);
}

// Функция добавления фильмов в просмотренные
function addToWatched(e) {
  const btnAddToWatched = modalCard.querySelector('.btn__watch');
  btnAddToWatched.textContent = 'REMOVE FROM WATCHED';
  
  let filmId = e.target.dataset.id;
  
  // если нет в массиве, то добавь
  if (!arrayOfWatched.includes(filmId)) {
          arrayOfWatched.push(filmId);
  }
  // и запиши в локал
  localStorage.setItem('arrayOfWatched', JSON.stringify(arrayOfWatched));
  
  console.log('добавлен в просмотренные')

}

// Функция добавления фильмов в очередь
function addToQueue(e) {
  const btnAddToQueue = modalCard.querySelector('.btn__queue');
  btnAddToQueue.textContent = 'REMOVE FROM QUEUE';
  
  let filmId = e.target.dataset.id;
 
  // если нет в массиве, то добавь
  if (!arrayOfQueue.includes(filmId)) {
          arrayOfQueue.push(filmId);
  }
  // и запиши в локал
  localStorage.setItem('arrayOfQueue', JSON.stringify(arrayOfQueue));
  
  console.log('добавлен в список')
}