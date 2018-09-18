require('./initializationLoading.css');
function insertInitializationLoading(){
    var el = document.createElement('div');
    el.innerHTML = '<div id="initializationLoading"><div id="progress"></div></div>';
    const elFirstChild = el.firstChild;
    document.body.appendChild(elFirstChild);
}
function removeInitializationLoading() {
    var initializationLoadingEl = document.getElementById('initializationLoading');

    function removeElement(element) {
        element && element.parentNode && element.parentNode.removeChild(element);
    }

    removeElement(initializationLoadingEl);
}
insertInitializationLoading();


function init() {
    import(/* webpackChunkName: "entry" */ './entry')
        .then(function (entry) {
            var onDeviceReady = entry.default;
            removeInitializationLoading();
            onDeviceReady();
        })
        .catch(function (e) {
            console.log(e);
            console.log('An error occurred while loading the component');
        });
}
init();

