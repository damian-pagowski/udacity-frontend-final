const path = require("path");
const express = require("express");
const moment = require("moment");
const app = express();
const bodyParser = require("body-parser");
const { numberOfDaysBetweenDates } = require("./helpers");
const {
  getImagesData,
  getCoordinates,
  getCurrentWeather,
  getForecast,
  extractImage
} = require("./services");

app.use(express.static("dist"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

console.log(__dirname);

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
  const weather =
    daysRemaining < 14
      ? await getCurrentWeather(trip)
      : await getForecast(trip);
  trip.weather = weather;
  // add trip to trip array
  trips.push(trip);
  //send response
  res.json(trip);
});

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
