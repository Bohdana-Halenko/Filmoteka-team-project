import '../sass/main.scss';

import axios from 'axios';

import './header';
import './modalSignIn';
import './registration';
import './loadStartGallery';
import './searchFilms';

// // Pagination
// import { getTrendingMovie, getMovieBySearch, getMovieDetails, getGenres } from './apiService';
// import { renderPaginationTrendingMovie } from './pagination';

// getTrendingMovie()
//   .then(films => {
//     renderPaginationTrendingMovie(films.totalTrending);
//   })
//   .catch(error => console.error(error.message));

import './loadModalCard';

import './modalFooter';

import './renderOnClickLogo';

import API from './apiService';

// import './darkOn';
import './openNewWindow'

//Loader
import './loader';
import './upBtn';

//FireBase
import './fireBaseInit';
import './auth';
import './register';
// Проверка работы API - это просто тест
// API.getTrendingMovie().then(res => console.log('Trending res', res));
// API.getMovieBySearch('comedy').then(res => console.log('Search res', res));
// API.getMovieDetails(300).then(res => console.log('Details res', res));
// API.getGenres().then(res => console.log('Genres res', res));

// console.log(loadStartGallery);
