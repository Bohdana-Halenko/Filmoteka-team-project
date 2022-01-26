import { dataRequest, clearGallery, loadStartGallery } from './loadStartGallery';
import API from './apiService';

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

  clearGallery();
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
// Это очень сырой набросок
  
const galleryList = document.querySelector('.gallery-list');

buttonWatched.addEventListener('click', onWatchedBtn);

function onWatchedBtn(e) {
  // очищаем галлерею
  galleryList.innerHTML = '';

  let watchedArray = localStorage.getItem('arrayOfWatched');
  watchedArray = JSON.parse(watchedArray);

  console.log(watchedArray);
     
  if (watchedArray) {
    for (const film of watchedArray) {
      API.getMovieDetails(film)
        .then(film => {
          loadStartGallery(film);
          console.log(film);
        })
        .catch(error => console.log(error));
    }
  }

}