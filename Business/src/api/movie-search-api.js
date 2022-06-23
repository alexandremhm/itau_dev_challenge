const axios = require('axios');

const getMovieByTitle = async (movie) => {
  const endpoint = `https://omdbapi.com/?apikey=d7f1fd21&t=${movie}`;
  try {
    const { data } = await axios.get(endpoint);
    return data;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getMovieByTitle,
};
