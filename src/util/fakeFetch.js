import qs from 'qs';
const originFetch = window.fetch;

window.fetch = function() {
    const request = arguments[1];
    const body= qs.parse(request.body);
    request.headers['X-YIGO-Source'] = 'h5';
    body.locale = body.locale === 'en'?'en-US':body.locale;
    request.body = qs.stringify(body);
    return originFetch.apply(this, arguments);
}
