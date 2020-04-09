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

function getImagesData(destination) {
  const url = `${pixabayAPI}?key=${pixabayKey}&q=${destination}&image_type=photo&page=1&per_page=3`;
  return fetch(url).then((res) => res.json());
}
const extractImage = (imageJson) => imageJson.hits[0].webformatURL;

app.get("/", async (req, res) => {
  res.sendFile("dist/index.html");
});

app.post("/trip", async (req, res) => {
  const { date, destination } = req.body;
  const day = moment(date, "DD/MM/YYYY").toDate();

  const imageJson = await getImagesData(destination);


  res.json({ image: extractImage(imageJson) });

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
