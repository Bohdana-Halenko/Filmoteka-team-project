import allGenres from '../js/genres.json';

// Извлечение локальных жанров из json файла
function getGenres() {
  const { genreID } = allGenres;
  return genreID;
}

function transformGenres(filmsData) {
  filmsData.map(item => {
    let newGenre = [];

    if (item.genre_ids) {
      item.genre_ids.forEach(id => {
        const found = genreID.find(item => item.id === id);
        newGenre.push(found.name);
      });
    } else if (item.genres.length !== 0 && typeof item.genres !== 'string') {
      item.genres.forEach(({ id }) => {
        const found = genreID.find(item => item.id === id);
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
