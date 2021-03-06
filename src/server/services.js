const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

const pixabayAPI = process.env.API_URL_PIXABAY;
const pixabayKey = process.env.API_KEY_PIXABAY;
const geonamesApi = process.env.API_URL_GEONAMES;
const geonamesUsername = process.env.API_USERNAME_GEONAMES;
const weatherbitKey = process.env.API_KEY_WEATHERBIT;
const weatherbitApi = process.env.API_URL_WEATHERBIT;

module.exports = {
  extractImage: (imageJson) => imageJson.hits[0].webformatURL,
  getImagesData: (destination) => {
    const url = `${pixabayAPI}?key=${pixabayKey}&q=${destination}&image_type=photo&page=1&per_page=3`;
    return fetch(url).then((res) => res.json());
  },

  getCoordinates: async (destination) => {
    const url = `${geonamesApi}/searchJSON?q=${destination}&maxRows=10&username=${geonamesUsername}`;
    const geo = await fetch(url).then((res) => res.json());
    const longitude = geo.geonames.length > 0 ? geo.geonames[0].lng : null;
    const latitude = geo.geonames.length > 0 ? geo.geonames[0].lat : null;
    return { longitude, latitude };
  },

  getForecast: async (trip) => {
    const url = `${weatherbitApi}?lat=${trip.coordinates.latitude}&lon=${trip.coordinates.longitude}&key=${weatherbitKey}`;
    const data = await fetch(url).then((res) => res.json());
    const forecastDays = data.data.length;
    const weather =
      trip.daysRemaining >= forecastDays
        ? data.data[forecastDays - 1]
        : data.data[trip.daysRemaining];
    return {
      min: weather.min_temp,
      max: weather.max_temp,
      desc: weather.weather.description,
    };
  },
};
