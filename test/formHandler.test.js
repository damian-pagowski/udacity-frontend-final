
const formHandler = require('../src/client/js/formHandler.js');

test('form handler should have function handleSubmit', () => {
  expect(typeof formHandler.handleSubmit).toBe("function");
});

