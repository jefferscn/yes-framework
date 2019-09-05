const context = require.context('./templates', true, /index.js$/);

const obj = {};
context.keys().forEach((key) => {
    const tmp = context(key).default;
    obj[tmp.key] = tmp;
});

export default obj;
