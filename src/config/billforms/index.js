// import defaultForm from './default.json';
// import SD_SaleOrder from './SD_SaleOrder.json';

// export default {
//     default: defaultForm,
//     SD_SaleOrder,
// };
const context = require.context('./', true, /.json$/);

const obj = {};
context.keys().forEach((key) => {
  const countryCode = key.split('/').pop() // remove the first 2 characters
    .split('.').shift(); // remove the file extension
  obj[countryCode] = context(key);
});

export default obj
