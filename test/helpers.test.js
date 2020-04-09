import "regenerator-runtime/runtime";
const { numberOfDaysBetweenDates } = require("../src/server/helpers");

test("helpers should have numberOfDaysBetweenDates function", () => {
  expect(numberOfDaysBetweenDates).toBeDefined();
});
