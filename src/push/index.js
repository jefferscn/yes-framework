import { AppDispatcher } from 'yes';
import ProjectConfig from '../config/project.json';
import baidupush from './baidupush';
import jpush from './jpush';

const _init = ()=> {
    //baidu推送
    if(ProjectConfig.baidupush && ProjectConfig.baidupush.apiKey) {
        baidupush.init(ProjectConfig.baidupush.apiKey);
        return;
    }
    //极光推送
    if(ProjectConfig.jpush) {
        jpush.init();
        return;
    }
};

const _uninit = async ()=> {
    if(ProjectConfig.baidupush && ProjectConfig.baidupush.apiKey) {
        await baidupush.uninit();
    }
    if(ProjectConfig.jpush) {
        await jpush.uninit();
    }
    AppDispatcher.dispatch({
        type: 'LOGOUT',
    });
};

export const init = () => {
    AppDispatcher.register((action) => {
        switch (action.type) {
            case 'LOGINED'://登录之后需要注册deviceId
                _init();
                break;
            case 'XIEXINLOGOUT'://登出之后需要注销deviceId
                _uninit();
                break;
        }
    });
}
