import axios from 'axios';

const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `6a7bc4e26417129845bc117e7a600f1d`;

// Получение трендовых фильмов - главная страница

export const getTrendingMovie = () => {
    return axios
        .get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
        .then((response) => ({
            totalTrending: response.data.total_results,
            resultsTrending: response.data.results,
        }))
            .catch((error) => {
                console.error("Something wrong with TrendingMovie fetch", error.message)
            })
        }

// async function getTrendingMovie() {
//     const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
//     return await axios
//         .get(url)
//         .then((response) => {
//             // console.log('Trending response', response.data);
//             return {
//                 totalTrending: response.data.total_results,
//                 resultsTrending: response.data.results
//             }
//         })
//         .catch((error) => {console.error("Something wrong with TrendingMovie fetch", error.message) 
//     })
//   }

// Получение фильмов по поиску

async function getMovieBySearch(searchQuery) {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`;
    return await axios
        .get(url)
        .then((response) => {
            // console.log('Search response', response.data);
           return {
                totalSearch: response.data.total_results,
                resultsSearch: response.data.results
            }
        })
        .catch((error) => {console.error("Something wrong with getMovieBySearch fetch", error.message) 
    })
  }

// Получение детальной информации о фильме - в модалку

async function getMovieDetails(movieId) {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    return await axios
        .get(url)
        .then((response) => ({
                data: response.data,
                genresCut: response.data.genres.slice(0, 3)
        }))
        .catch((error) => {console.error("Something wrong with getMovieDetails fetch", error.message)
        
    })
}

// Получение жанров

async function getGenres() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    return await axios
        .get(url)
        .then((response) => {
            // console.log('Genres response', response.data);
            return response.data.genres
        })
        .catch((error) => {console.error("Something wrong with getGenres fetch", error.message)
        
    })
}


export default { getTrendingMovie, getMovieBySearch, getMovieDetails, getGenres}
