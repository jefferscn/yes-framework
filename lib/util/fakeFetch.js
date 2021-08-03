import qs from 'qs';
export var originFetch = window.fetch;
import ResizeObserver from 'resize-observer-polyfill';
window.fetch = function () {
    var request = arguments[1];
    try {
        var body = qs.parse(request.body);
        var method = request.method || "GET";
        method = method.toUpperCase();
        if (method === 'POST' && body.locale) {
            body.locale = body.locale === 'en' ? 'en-US' : body.locale;
            request.body = qs.stringify(body);
        }
    }
    catch (ex) {
        console.log(ex);
    }
    // request.headers && (request.headers['X-YIGO-Source'] = 'h5');
    return originFetch.apply(this, arguments);
};
if (!window.ResizeObserver) {
    window.ResizeObserver = ResizeObserver;
}
