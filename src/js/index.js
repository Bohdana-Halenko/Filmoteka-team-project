import '../sass/main.scss';

import axios from 'axios';

import './header';
import './loadStartGallery';

// Pagination
import { getTrendingMovie, getMovieBySearch, getMovieDetails, getGenres } from './apiService';
import { renderPaginationTrendingMovie } from './pagination';

getTrendingMovie()
  .then(films => {
    renderPaginationTrendingMovie(films.totalTrending);
  })
  .catch(error => console.error(error.message));

import './loadModalCard';
import './convertData';

import './modalFooter';

import API from './apiService';

//Loader
import './loader';

// Проверка работы API - это просто тест
// API.getTrendingMovie().then(res => console.log('Trending res', res));
// API.getMovieBySearch('comedy').then(res => console.log('Search res', res));
// API.getMovieDetails(300).then(res => console.log('Details res', res));
// API.getGenres().then(res => console.log('Genres res', res));

// console.log(loadStartGallery);
