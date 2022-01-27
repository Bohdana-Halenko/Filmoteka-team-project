import axios from 'axios';
import libraryTpl from '../templates/library.hbs';
import { dataRequest, noSaved, noPagination } from './loadStartGallery';

const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `6a7bc4e26417129845bc117e7a600f1d`;
// ==============================================================
const navElemHome = document.querySelector('.nav-list__item-home');
const navElemLibrary = document.querySelector('.nav-list__item-library');
const signIn = document.querySelector('.sign-in__button')
const formWindow = document.querySelector('.login-form__window')
const searchForm = document.querySelector('.search');
const libraryButtons = document.querySelector('.library__btns');
const headerContainer = document.querySelector('.header__container');
const buttonWatched = document.querySelector('.library__btn-watched');
const buttonQueue = document.querySelector('.library__btn-queue');

navElemLibrary.addEventListener('click', changeClassToLibrary);
navElemHome.addEventListener('click', changeClassToHome);
buttonWatched.addEventListener('click', addWatchedBtnAccent);
buttonQueue.addEventListener('click', addQueueBtnAccent);
signIn.addEventListener('click', openSignInForm)

function changeClassToHome(e) {
  e.preventDefault();  
  navElemHome.classList.add('nav-list__item-home-active');
  navElemLibrary.classList.remove('nav-list__item-library-active');

  searchForm.classList.remove('is-hidden');
  searchForm.classList.add('search');
  libraryButtons.classList.add('is-hidden');

  headerContainer.classList.remove('header__container-library');
  dataRequest(1);
}
function changeClassToLibrary(e) {
  e.preventDefault();
  navElemLibrary.classList.add('nav-list__item-library-active');
  navElemHome.classList.remove('nav-list__item-home-active');

  searchForm.classList.add('is-hidden');
  searchForm.classList.remove('search');
  libraryButtons.classList.remove('is-hidden');

  headerContainer.classList.remove('header__container-non-active');
  headerContainer.classList.add('header__container-library');

  
}
function addWatchedBtnAccent() {
  buttonWatched.classList.add('library__btn-active');
  buttonQueue.classList.remove('library__btn-active');
}
function addQueueBtnAccent() {
  buttonWatched.classList.remove('library__btn-active');
  buttonWatched.classList.add('library__btn');
  buttonQueue.classList.add('library__btn-active');
}

  
function openSignInForm(){
  formWindow.classList.toggle('is-hidden')
}
export { changeClassToHome, changeClassToLibrary, addWatchedBtnAccent, addQueueBtnAccent, openSignInForm };

// =================================================
// Отрисовываем Library

const galleryList = document.querySelector('.gallery-list');
const libraryBtn = document.querySelector('.nav-list__link-library');

libraryBtn.addEventListener('click', onLibrary)
buttonWatched.addEventListener('click', onWatchedBtn);
buttonQueue.addEventListener('click', onQueueBtn);

function onLibrary(e) {
  if (localStorage.getItem('arrayOfWatched') === null) {
    noSaved();
  }
  else {
    onWatchedBtn();
    noPagination();
  }

}

export function onWatchedBtn() {
  galleryList.innerHTML = '';

  let watchedArray = localStorage.getItem('arrayOfWatched');
  watchedArray = JSON.parse(watchedArray);
 
  if (watchedArray.length === 0) {
    noSaved();
  }

  else
    
    if (watchedArray) {
    for (const filmId of watchedArray) {
      fetchSavedFilms(filmId)
        .then(savedFilms => {
          // transformYear(savedFilms);
          renderSaved(savedFilms)
        })
        .catch(error => console.log(error));
    }
  }
  
}

// function transformYear(savedFilms) {
//   const release_date = savedFilms.release_date.slice(0, 4);
//   console.log(release_date)
//   return release_date
// }

export function onQueueBtn() {
  galleryList.innerHTML = '';

  let queueArray = localStorage.getItem('arrayOfQueue');
  queueArray = JSON.parse(queueArray);
 
  if (queueArray.length === 0) {
     noSaved();
  }
   else
     if (queueArray) {
    for (const filmId of queueArray) {
      fetchSavedFilms(filmId)
        .then(savedFilms => {
          renderSaved(savedFilms)
        })
        .catch(error => console.log(error));
    }
  }
}


function fetchSavedFilms(filmId) {
  return axios
    .get(
    `${BASE_URL}/movie/${filmId}?api_key=${API_KEY}&language=en-US`,
  )
    .then(response => {
    return response.data;
    })
    .catch(error => console.log(error));
}

function renderSaved(savedFilms) {
  const markup = libraryTpl(savedFilms);
  galleryList.insertAdjacentHTML('beforeend', markup);
}

