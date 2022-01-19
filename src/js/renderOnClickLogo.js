// import gallery from '../templates/gallery.hbs';
// import API from './apiService';
// import transformData from './transformData';
// import transformGenres from './transfomGenres';

import { dataRequest } from './loadStartGallery';

// нашли лого
const homeLogo = document.querySelector('.logo__link');

// слушаем нажатие на logo
homeLogo.addEventListener('click', renderClickLogo, false);

// функция рендера галереи без перезагрузки страницы
function renderClickLogo(evt) {
  evt.preventDefault();
  dataRequest(1);
}
