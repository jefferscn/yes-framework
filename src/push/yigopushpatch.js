import { Svr, View as YIGOView } from 'yes-core';

const invokeService = YIGOView.FuncMap.get('InvokeService');
/**
 * 
 * @param {deviceId} Id 
 * @param {使用的推送方案类型} type 
 */
export async function register(Id, type) {
    return await invokeService('', {}, ['PushService', false, false, 'Register', Id, type, window.device.platform]);
}

export async function unregister(type) {
    return await invokeService('', {}, ['PushService', false, false, 'Unregister', type, window.device.platform]);
}
