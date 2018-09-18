// document.addEventListener('DOMContentLoaded', () => {
    initializationLoading();
// });

document.addEventListener('DOMContentLoaded', () => {
    console.info('DOMContentLoaded');
});
window.addEventListener('load', () => {
    console.info('load');
});
require('./initializationLoading.css');
function initializationLoading() {
    // insert loading
    const el = document.createElement('div');
    el.innerHTML = '<div id="initializationLoading"><div id="progress"></div></div>';
    const elFirstChild = el.firstChild;
    document.body.appendChild(elFirstChild);

    // load verdor.js app.js
    const scriptList = ['vendor.js', 'app.js'];

    function loadJS(scriptSrc) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('defer', '');
            script.onload = function () {
                // console.log(`The script ${scriptSrc} download success.`);
                resolve();
            };
            script.onerror = function (err) {
                // console.log(err);
                reject(new URIError(`The script ${err.target.src} is not accessible.`));
            };
            script.setAttribute('src', scriptSrc);
            document.body.appendChild(script);
        });
    }
    /*
    let loadPromise = Promise.resolve();
    scriptList.forEach((item) => {
        loadPromise = loadPromise.then(() => {
            return loadJS(item);
        });
    });

    loadPromise.then(() => {
        removeInitializationLoading();
    });
*/
    loadJS('app.js').then(() => {
        removeInitializationLoading();
    });




    // remove loading
    function removeInitializationLoading() {
        const initializationLoadingEl = document.getElementById('initializationLoading');

        function removeElement(element) {
            element && element.parentNode && element.parentNode.removeChild(element);
        }

        removeElement(initializationLoadingEl);
    }
}
