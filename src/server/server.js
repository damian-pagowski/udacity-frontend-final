const path = require("path");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();

app.use(express.static("dist"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// set aylien API credentias
const AYLIENTextAPI = require("aylien_textapi");
const textapi = new AYLIENTextAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

console.log(__dirname);

app.get("/", (req, res) => {
  res.sendFile("dist/index.html");
});


app.post("/test", async (req, res) => {
  const { url } = req.body;
  const isValid = /^(ftp|http|https):\/\/[^ "]+$/.test(url)
  if (!isValid){
    return res.json({error: "Invalid URL!"})
  }
  const params = {
    url,
  };
  const cb = (error, response) => {
    if (error === null) {
      console.log(response);
      res.send({
        url,
        language: response.language,
        categories: response.categories,
      });
    }
  };
  textapi.classify(params, cb);
});

// designates what port the app will listen to for incoming requests
app.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});
