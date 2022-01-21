import modalCardTpl from '../templates/modal-card.hbs';
import API from './apiService'
// =========================================================
const galleryList = document.querySelector('.gallery-list');
const modalCard = document.querySelector('.modal-card');
// const trailerBackdrop = document.querySelector('.trailer__backdrop');
// const trailerModal = document.querySelector('.trailer__modal');
// const trailerContainer = document.querySelector('.trailer__container');
// ==========================================================

galleryList.addEventListener('click', clickOnMovie);

function clickOnMovie(e) {
    if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'H2') {
      return;
    }
  let movieId = e.target.dataset.id;
  
  API.getMovieDetails(movieId).then((res) => renderModalCard(res));
  // API.getTrailerKey(movieId).then((key) => {
  //   trailerContainer.setAttribute(data-key, key)
  // });
  
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
}

function modalCloseByEsc(e) {
  if (e.code === 'Escape') {
    modalClose();
  }
}

// Смотреть трейлер

// function onTrailerBtnClick(e) {
//   trailerBackdrop.classList.remove('visually-hidden');
//   API.getTrailerKey(movieId).then((key) => console.log('key', key));
//   const filmUrl = e.target.dataset.id;
//   console.log(filmUrl)
//   renderTrailer(500);
//   console.log('Работает1')
// }

// function renderTrailer(key) {
//   trailerContainer.style.backgroundImage = `url(https://img.youtube.com/vi/${key}/maxresdefault.jpg)`;
//   const trailerUrl = `https://www.youtube.com/embed/${key}?autoplay=0&enablejsapi=1&rel=0&modestbranding=1&`;
//   const video = `<iframe
//       id="player"
//       src="${trailerUrl}"
//       width="640"
//       height="360"
//       frameborder="0"
//       allowfullscreen
//       allow="autoplay; encrypted-media"
//     ></iframe>`;
//   trailerContainer.innerHTML = video;
// }

// Функция добавления фильмов в просмотренные
function addToWatched() {
  console.log('Работает2') 
}

// Функция добавления фильмов в очередь
function addToQueue() {
  console.log('Работает3')
}