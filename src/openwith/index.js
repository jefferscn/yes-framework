import global from 'global';

export const init = (handler) => {
    if (!(global.cordova && global.cordova.openwith)) {
        console.log('openwith init fail!')
        return;
    }
    function initSuccess() { console.log('init success!'); }
    function initError(err) { console.log('init failed: ' + err); }
    global.cordova.openwith.setVerbosity(0)
    global.cordova.openwith.init(initSuccess, initError);

    function myHandler(intent) {
        console.log('intent received');

        console.log('  action: ' + intent.action); // type of action requested by the user
        console.log('  exit: ' + intent.exit); // if true, you should exit the app after processing

        for (var i = 0; i < intent.items.length; ++i) {
            var item = intent.items[i];
            console.log('  type: ', item.type);   // mime type
            console.log('  uri:  ', item.uri);     // uri to the file, probably NOT a web uri

            // some optional additional info
            console.log('  text: ', item.text);   // text to share alongside the item, iOS only
            console.log('  name: ', item.name);   // suggested name of the image, iOS 11+ only
            console.log('  utis: ', item.utis);
            console.log('  path: ', item.path);   // path on the device, generally undefined
        }

        // ...
        // Here, you probably want to do something useful with the data
        // ...
        // An example...

        if (intent.items.length > 0 && handler) {
            global.cordova.openwith.load(intent.items[0], function (data, item) {

                // data is a long base64 string with the content of the file
                console.log("the item weights " + data.length + " bytes");
                // uploadToServer(item);
                handler(item);

                // "exit" when done.
                // Note that there is no need to wait for the upload to finish,
                // the app can continue while in background.
                if (intent.exit) { global.cordova.openwith.exit(); }
            });
        }
        else {
            if (intent.exit) { global.cordova.openwith.exit(); }
        }
    }
    global.cordova.openwith.addHandler(myHandler);
}