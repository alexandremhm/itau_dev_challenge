const axios = require('axios');

const getMovieByTitle = async (movie) => {
  const APIKEY = process.env.API_KEY
  const endpoint = `https://omdbapi.com/?apikey=${APIKEY}&t=${movie}`;
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
