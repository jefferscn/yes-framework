import { register, unregister } from './yigopushpatch';
import { History } from 'yes-platform';

let registrationID = null;
document.addEventListener("jpush.openNotification", function (event) {
    console.log(event);
    var extra = null;
    if (device.platform == "Android") {
        extra = event.extras;
    } else {
        extra = event;
    }
    if(extra.messageType) {
        if(extra.messageType==='openForm') {
            const { formKey, oid } = extra;
            if(formKey && oid) {
                History.push(`card/YES/${formKey}/${oid}/DEFAULT`);
            }
        }
        if(extra.messageType==='openWorkitem') {
            const { workitemId } = extra;
            if(workitemId) {
                History.push(`card/WORKITEM/${workitemId}/false/true/true`);
            }
        }
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
