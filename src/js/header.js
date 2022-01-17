const navElemHome = document.querySelector('.nav-list__item-home');
const navElemLibrary = document.querySelector('.nav-list__item-library');
const searchForm = document.querySelector('.search');
const libraryButtons = document.querySelector('.library-btns');
const headerContainer = document.querySelector('.header__container');

navElemLibrary.addEventListener('click', changeClassToLibrary);
navElemHome.addEventListener('click', changeClassToHome);

function changeClassToHome(){    
    navElemHome.classList.add('nav-list__item-home-active');
    navElemLibrary.classList.remove('nav-list__item-library-active');

    searchForm.classList.remove('is-hidden');
    libraryButtons.classList.add('is-hidden');

    headerContainer.classList.remove('header__container-library');
} 
function changeClassToLibrary(e){
    e.preventDefault();
    navElemLibrary.classList.add('nav-list__item-library-active');
    navElemHome.classList.remove('nav-list__item-home-active');   

    searchForm.classList.add('is-hidden');
    libraryButtons.classList.remove('is-hidden');

    headerContainer.classList.remove('header__container');
    headerContainer.classList.add('header__container-library');
}
