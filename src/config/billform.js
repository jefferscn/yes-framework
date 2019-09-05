const context = require.context('./billforms/', true, /.json$/);

const obj = {};
context.keys().forEach((key) => {
  const countryCode = key.split('/').pop() // remove the first 2 characters
    .split('.').shift(); // remove the file extension
  obj[countryCode] = context(key);
});

export default obj
