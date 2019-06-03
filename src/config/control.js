const context = require.context('../controls', true, /.js$/);

const obj = {};
context.keys().forEach((key) => {
  const countryCode = key.split('/').pop() // remove the first 2 characters
    .split('.').shift(); // remove the file extension
  obj[countryCode] = context(key).default;
});

export default obj;
