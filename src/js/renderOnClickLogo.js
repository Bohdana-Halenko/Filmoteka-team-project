import { dataRequest } from './loadStartGallery';

const navElemHome = document.querySelector('.nav-list__item-home');
const navElemLibrary = document.querySelector('.nav-list__item-library');
const searchForm = document.querySelector('.search');
const libraryButtons = document.querySelector('.library__btns');
const headerContainer = document.querySelector('.header__container');

// нашли лого
const homeLogo = document.querySelector('.logo__link');

// слушаем нажатие на logo
homeLogo.addEventListener('click', renderClickLogo);

// функция рендера галереи без перезагрузки страницы
function renderClickLogo(evt) {
  evt.preventDefault();
  changeClassToHome();
  dataRequest(1);
}

// функция рендера хедера
function changeClassToHome() {
  navElemHome.classList.add('nav-list__item-home-active');
  navElemLibrary.classList.remove('nav-list__item-library-active');

  searchForm.classList.remove('is-hidden');
  searchForm.classList.add('search');
  libraryButtons.classList.add('is-hidden');

  headerContainer.classList.remove('header__container-library');
}
