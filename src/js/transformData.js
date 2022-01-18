function transformData(filmsData) {
  filmsData.map(item => {
    if (item.release_date) {
      item.release_date = item.release_date.slice(0, 4);
    }

    return item;
  });
}
export default transformData;
