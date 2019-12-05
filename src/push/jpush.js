import { register, unregister } from './yigopushpatch';

let registrationID = null;
document.addEventListener("jpush.openNotification", function (event) {
    console.log(event);
  var alertContent
  if(device.platform == "Android") {
    alertContent = event.alert
  } else {
    alertContent = event.aps.alert
  }
}, false);

function init() {
    JPush.init();
    JPush.getRegistrationID(function (rId) {
        if (rId) {
            console.log("JPushPlugin:registrationID is " + rId);
            registrationID = rId;
            register(rId, 'jpush');
        }
    });
}

function uninit() {
    if (registrationID) {
        unregister(registrationID, 'jpush');
    }
}

export default {
    init,
    uninit,
}
