import genresJson from './genres.json';

// Извлечение локальных жанров из json файла
const genres = genresJson['genres'];

function transformGenres(filmsData) {
  filmsData.map(item => {
    let newGenre = [];

    if (item.genre_ids) {
      item.genre_ids.forEach(id => {
        const found = genres.find(item => item.id === id);
        newGenre.push(found.name);
      });
    }

    if (newGenre.length >= 4) {
      const manyGenres = newGenre.slice(0, 3);
      item.genres = manyGenres.join(', ');
    } else {
      item.genres = newGenre.join(', ');
    }

    return item;
  });
}

export default transformGenres;
