var context = require.context('../controls', true, /.js$/);
var obj = {};
context.keys().forEach(function (key) {
    var c = context(key).default;
    if (c.key) {
        obj[c.key] = c;
    }
    else {
        var name_1 = key.split('/').pop() // remove the first 2 characters
            .split('.').shift(); // remove the file extension
        obj[name_1] = c;
    }
});
export default obj;
