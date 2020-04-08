const nameChecker = require("../src/client/js/nameChecker.js");

test("nameChecker should have function checkForName", () => {
  expect(typeof nameChecker.checkForName).toBe("function");
});
