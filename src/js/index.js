import axios from 'axios';
import Pagination from 'tui-pagination';
import './loadStartGallery';

import API from './apiService';

// Проверка
API.getTrendingMovie(10).then(res => console.log('Trending res', res));
API.getMovieBySearch('comedy', 5).then(res => console.log('Search res', res));
API.getMovieDetails(300).then(res => console.log('Details res', res));
API.getGenres().then(res => console.log('Genres res', res));

// console.log(loadStartGallery);
