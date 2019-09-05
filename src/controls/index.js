import { controls as CustomControls } from '../config';
const context = require.context('./default', true, /.js$/);

const obj = {};
context.keys().forEach((key) => {
  const c = context(key).default;
  if(c.key) {
    obj[c.key] =  c;
  } else {
    const name = key.split('/').pop() // remove the first 2 characters
      .split('.').shift(); // remove the file extension
    obj[name] = c;
  }
});

export default Object.assign({}, obj, CustomControls);
