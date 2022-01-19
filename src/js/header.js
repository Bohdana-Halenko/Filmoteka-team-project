const navElemHome = document.querySelector('.nav-list__item-home');
const navElemLibrary = document.querySelector('.nav-list__item-library');
const searchForm = document.querySelector('.search');
const libraryButtons = document.querySelector('.library__btns');
const headerContainer = document.querySelector('.header__container');
const buttonWatched = document.querySelector('.library__btn-watched');
const buttonQueue = document.querySelector('.library__btn-queue');

navElemLibrary.addEventListener('click', changeClassToLibrary);
navElemHome.addEventListener('click', changeClassToHome);
buttonWatched.addEventListener('click', addWatchedBtnAccent);
buttonQueue.addEventListener('click', addQueueBtnAccent);

function changeClassToHome() {
  navElemHome.classList.add('nav-list__item-home-active');
  navElemLibrary.classList.remove('nav-list__item-library-active');

  searchForm.classList.remove('is-hidden');
  libraryButtons.classList.add('is-hidden');

  headerContainer.classList.remove('header__container-library');
}
function changeClassToLibrary(e) {
  e.preventDefault();
  navElemLibrary.classList.add('nav-list__item-library-active');
  navElemHome.classList.remove('nav-list__item-home-active');

  searchForm.classList.add('is-hidden');
  searchForm.classList.remove('search');
  libraryButtons.classList.remove('is-hidden');

  headerContainer.classList.remove('header__container');
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

export { changeClassToHome, changeClassToLibrary, addWatchedBtnAccent, addQueueBtnAccent };
