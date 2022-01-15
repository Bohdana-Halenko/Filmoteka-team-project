import modalCardTpl from '../templates/modal-card.hbs';
import API from './apiService'

const galleryList = document.querySelector('.gallery-list');
const modalCardContainer = document.querySelector('.modal-card')

galleryList.addEventListener('click', clickOnMovie);

function clickOnMovie(e) {
   if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'H2') {
    return;
  }
  let movieId = e.target.dataset.id;
  API.getMovieDetails(movieId).then((data) => renderModalCard(data));
}

function renderModalCard(data) {
  const markup = modalCardTpl(data);
  modalCardContainer.innerHTML = markup;
}



