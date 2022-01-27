import modalCardTpl from '../templates/modal-card.hbs';
import API from './apiService';
import * as basicLightbox from 'basiclightbox';
import { onWatchedBtn, onQueueBtn } from './header';
import { noSaved } from './loadStartGallery';


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
      changeActiveOfBtns(movieId);
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
    let trailerKey = localStorage.getItem("trailer-key")
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

// Проверка при открытии модалки наличия фильмов в списках и отображение этого в кнопках
function changeActiveOfBtns(filmId) {
  const btnAddToWatched = modalCard.querySelector('.btn__watch');
  const btnAddToQueue = modalCard.querySelector('.btn__queue');

  if (arrayOfWatched.includes(filmId)) {
    // console.log('уже есть в просмотренных')
    btnAddToWatched.textContent = 'Remove from watched';
  }
  else {
    // console.log('нет такого в просмотренных');
    btnAddToWatched.textContent = 'Add to watched';
  }

  if (arrayOfQueue.includes(filmId)) {
    // console.log('уже есть в очереди')
    btnAddToQueue.textContent = 'Remove from queue';
  }
  else {
    // console.log('нет такого в очереди');
    btnAddToQueue.textContent = 'Add to queue';
  }
}

// Функция добавления фильмов в просмотренные
function addToWatched(e) {
  let filmId = e.target.dataset.id;
  
  if (e.target.textContent === 'Add to watched') {
    
        if (!arrayOfWatched.includes(filmId)) {
          arrayOfWatched.push(filmId);
        }

    localStorage.setItem('arrayOfWatched', JSON.stringify(arrayOfWatched));
    e.target.textContent = 'Remove from watched';
  }
  else if (arrayOfWatched.includes(filmId) && e.target.textContent === 'Remove from watched') {
    const filteredArr = JSON.parse(localStorage.getItem('arrayOfWatched')).filter(el => el !== filmId);
    localStorage.setItem('arrayOfWatched', JSON.stringify(filteredArr));
    e.target.textContent = 'Add to watched';
  }
  // если активна библиотека
  if (document.querySelector('.nav-list__item-library-active')) {
    onWatchedBtn();
  }
  
}

// Функция добавления фильмов в очередь
function addToQueue(e) {
  let filmId = e.target.dataset.id;
  
  if (e.target.textContent === 'Add to queue') {
    
    if (!arrayOfQueue.includes(filmId)) {
      arrayOfQueue.push(filmId);
    }

    localStorage.setItem('arrayOfQueue', JSON.stringify(arrayOfQueue));
    e.target.textContent = 'Remove from queue';
  }
  else
    if (arrayOfQueue.includes(filmId) && e.target.textContent === 'Remove from queue')
  {
    const filteredArr = JSON.parse(localStorage.getItem('arrayOfQueue')).filter(el => el !== filmId);
    localStorage.setItem('arrayOfQueue', JSON.stringify(filteredArr));
    e.target.textContent = 'Add to queue';
  }
  // если активна библиотека
  if (document.querySelector('.nav-list__item-library-active')) {
    onQueueBtn();
  }
}

// function addToQueue(e) {
//   const btnAddToQueue = modalCard.querySelector('.btn__queue');
//   let filmId = e.target.dataset.id;

//   if (arrayOfQueue.includes(filmId) && e.target.textContent === 'Remove from queue') {
//     const filteredArr = JSON.parse(localStorage.getItem('arrayOfQueue')).filter(el => el !== filmId);
//     localStorage.setItem('arrayOfQueue', JSON.stringify(filteredArr));
//     btnAddToQueue.textContent = 'Add to queue';
//   }
//   else {
//     arrayOfQueue.push(filmId);
//     localStorage.setItem('arrayOfQueue', JSON.stringify(arrayOfQueue));
//     btnAddToQueue.textContent = 'Remove from queue';
//   }
// }