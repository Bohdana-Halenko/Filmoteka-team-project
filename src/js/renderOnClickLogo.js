// import gallery from '../templates/gallery.hbs';
// import API from './apiService';
// import transformData from './transformData';
// import transformGenres from './transfomGenres';

import { dataRequest } from './loadStartGallery';
import { changeClassToHome } from './header';

const navElemHome = document.querySelector('.nav-list__item-home');

// нашли лого
const homeLogo = document.querySelector('.logo__link');

// слушаем нажатие на logo
homeLogo.addEventListener('click', renderClickLogo, false);

// функция рендера галереи без перезагрузки страницы
function renderClickLogo(evt) {
  evt.preventDefault();
  if (navElemHome.classList !== 'nav-list__item-home-active') {
    changeClassToHome();
  }
  dataRequest();
}
