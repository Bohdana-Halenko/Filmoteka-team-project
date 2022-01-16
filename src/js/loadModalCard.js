import modalCardTpl from '../templates/modal-card.hbs';
import API from './apiService'

const galleryList = document.querySelector('.gallery-list');
const modalCard = document.querySelector('.modal-card')

galleryList.addEventListener('click', clickOnMovie);

function clickOnMovie(e) {
  
    if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'H2') {
      return;
    }
    let movieId = e.target.dataset.id;
    API.getMovieDetails(movieId).then(({ data }) => renderModalCard(data));
 
}

function renderModalCard(data) {
  const markup = modalCardTpl(data);
  
  modalCard.innerHTML = markup;
  modalCard.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  const modalBackdrop = document.querySelector('.modal__backdrop');
  modalBackdrop.addEventListener('click', modalClosing);
  
  const closeButton = document.querySelector('.close-button')
  closeButton.addEventListener('click', modalClosing);

  window.addEventListener('keydown', modalClosinByEsc);
}

function modalClosing() {
  modalCard.classList.remove('is-open');
  document.body.style.overflow = '';
   window.removeEventListener('keydown', modalClosinByEsc);
}

function modalClosinByEsc(event) {
  if (event.code === 'Escape') {
    modalClosing();
  }
}


