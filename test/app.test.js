import "regenerator-runtime/runtime";
const { createTrip, removeTrip, getTrips } = require("../src/client/js/app");

test("client should have createTrip function", () => {
  expect(createTrip).toBeDefined();
});

test("client should have removeTrip function", () => {
  expect(removeTrip).toBeDefined();
});

test("client should have getTrips function", () => {
  expect(getTrips).toBeDefined();
});
