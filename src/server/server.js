const path = require("path");
const express = require("express");
const moment = require("moment");

const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
dotenv.config();

app.use(express.static("dist"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

console.log(__dirname);

const pixabayAPI = process.env.API_URL_PIXABAY;
const pixabayKey = process.env.API_KEY_PIXABAY;
const geonamesApi = process.env.API_URL_GEONAMES;
const geonamesUsername = process.env.API_USERNAME_GEONAMES;
const openWeatherApi = process.env.API_URL_OPEN_WEATHER;
const openWeatherKey = process.env.API_KEY_OPEN_WEATHER;

function getImagesData(destination) {
  const url = `${pixabayAPI}?key=${pixabayKey}&q=${destination}&image_type=photo&page=1&per_page=3`;
  return fetch(url).then((res) => res.json());
}
const extractImage = (imageJson) => imageJson.hits[0].webformatURL;

async function getCoordinates(destination) {
  const url = `${geonamesApi}/searchJSON?q=${destination}&maxRows=10&username=${geonamesUsername}`;
  const geo = await fetch(url).then((res) => res.json());
  const longitude = geo.geonames.length > 0 ? geo.geonames[0].lng : null;
  const latitude = geo.geonames.length > 0 ? geo.geonames[0].lat : null;
  return { longitude, latitude };
}

function numberOfDaysBetweenDates(date1, date2) {
  const diff = date2.getTime() - date1.getTime();
  return Math.round(diff / (1000 * 3600 * 24));
}

async function getCurrentWeather(trip) {
  const url = `${openWeatherApi}?lat=${trip.coordinates.latitude}&lon=${trip.coordinates.longitude}&appid=${openWeatherKey}`;
  console.log("WEATHER API URL: " + url)
  const weather = await fetch(url).then((res) => res.json());
  return {
    min: weather.main.temp_min,
    max: weather.main.temp_max,
    desc: weather.weather[0].description,
  };
}
// TRIPS
let trips = [];
// ROUTES
app.get("/", (req, res) => {
  res.sendFile("dist/index.html");
});

app.get("/trip", async (req, res) => {
  res.json(trips);
});

app.delete("/trip/:id", async (req, res) => {
  const { id } = req.params;
  trips = trips.filter((trip) => trip.id != id);
  res.json(trips);
});
app.post("/trip", async (req, res) => {
  const { date, destination } = req.body;
  //handling date, days remaining
  const day = moment(date, "DD/MM/YYYY").toDate();
  const now = new Date();
  const daysRemaining = numberOfDaysBetweenDates(now, day);
  // destination inage
  const imageJson = await getImagesData(destination);
  // destination coordinates
  const { longitude, latitude } = await getCoordinates(destination);

  // build trip object and store in array
  const trip = {
    id: trips.length + 1,
    destination,
    coordinates: { longitude, latitude },
    date: day,
    daysRemaining,
    dateString: date,
    image: extractImage(imageJson),
  };

  // weather

  const weather = await getCurrentWeather(trip);
  // { min: -50, max: 50, desc: "Mostly sunny" };

  trip.weather = weather;
  // add trip to trip array
  trips.push(trip);
  //send response
  res.json(trip);

  // ######### WEATHERBIT #########
  // https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY
  // &lat=38.123&lon=-78.543

  // GET FETCH EXAMPLE
  // fetch("https://api.github.com/users/github")
  //   .then((res) => res.json())
  //   .then((json) => console.log(json));

  // POST

  // const body = { a: 1 };

  // fetch("https://httpbin.org/post", {
  //   method: "post",
  //   body: JSON.stringify(body),
  //   headers: { "Content-Type": "application/json" },
  // })
  //   .then((res) => res.json())
  //   .then((json) => console.log(json));

  // //
});

const PORT = 3030;
// designates what port the app will listen to for incoming requests
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
