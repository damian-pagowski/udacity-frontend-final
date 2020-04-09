import "regenerator-runtime/runtime";
const {
  getImagesData,
  getCoordinates,
  getCurrentWeather,
  getForecast,
} = require("../src/server/services");

test("services should have getImagesData function", () => {
  expect(getImagesData).toBeDefined();
});
test("services should have getCoordinates function", () => {
  expect(getCoordinates).toBeDefined();
});
test("services should have getCurrentWeather function", () => {
  expect(getCurrentWeather).toBeDefined();
});

test("services should have getForecast function", () => {
  expect(getForecast).toBeDefined();
});
