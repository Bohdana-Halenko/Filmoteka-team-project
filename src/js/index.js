import '../sass/main.scss'

import axios from 'axios';
import Pagination from 'tui-pagination';

import './loadStartGallery';
import './loadModalCard';

import API from './apiService';

// Проверка работы API - это просто тест
// API.getTrendingMovie().then(res => console.log('Trending res', res));
// API.getMovieBySearch('comedy').then(res => console.log('Search res', res));
// API.getMovieDetails(300).then(res => console.log('Details res', res));
// API.getGenres().then(res => console.log('Genres res', res));

// console.log(loadStartGallery);
