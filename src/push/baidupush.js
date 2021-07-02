import { register, unregister } from './yigopushpatch';

function init(apiKey) {
    if (!baidu_push) {
        console.log('baidupush plugin not found!')
        return;
    }
    baidu_push.startWork(apiKey, function (data) {
        if(data.type==='onbind') {
            const { channelId } = data.data;
            register(channelId, 'baidupush');
        }
    });
}

function uninit() {
    if (!baidu_push) {
        console.log('baidupush plugin not found!')
        return;
    }
	baidu_push.stopWork((data)=>{
        if(data.type==='onunbind') {
            unregister('baidupush');
        }
    });
}

export default {
    init,
    uninit,
}
