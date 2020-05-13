import { BusyLoadingUtil } from 'yes';
import { Util } from 'yes-platform';
import { Alert } from 'react-native';
import I18nUtil from './i18nutil';

Util.alert = (title, msg) => {
    const data = title;
    title = msg ? title : '';
    msg = msg || data;
    const actions = [];
    actions.push({
        text: I18nUtil.formatMessage('OK')
    });
    Alert.alert(
        I18nUtil.formatMessage(title),
        I18nUtil.formatMessage(msg), actions,
        { cancelable: false });
};
Util.confirm = BusyLoadingUtil.pauseBusyLoadingWrapper((title, msg, type) => {
    const data = title;
    title = msg ? title : '';
    msg = msg || data;
    const debug = false;
    if (debug) {

        return null;
    }
    return new Promise((resolve, reject) => {
        type = type || 'OK';
        const actions = [];
        if (type === 'OK') {
            actions.push({
                text: I18nUtil.formatMessage('OK'),
                onPress: () => {
                    resolve('OK');
                }
            });
        }
        if (type === 'YES_NO') {
            actions.push({
                text: I18nUtil.formatMessage('YES'),
                onPress: () => {
                    resolve('YES');
                }
            });
            actions.push({
                text: I18nUtil.formatMessage('NO'),
                onPress: () => {
                    resolve('NO');
                }
            });
        }
        if (type === 'YES_NO_CANCEL') {
            actions.push({
                text: I18nUtil.formatMessage('YES'),
                onPress: () => {
                    resolve('YES');
                }
            });
            actions.push({
                text: I18nUtil.formatMessage('NO'),
                onPress: () => {
                    resolve('NO');
                }
            });
            actions.push({
                text: I18nUtil.formatMessage('CANCEL'),
                onPress: () => {
                    resolve('Cancel');
                }
            });
        }
        Alert.alert(
            I18nUtil.formatMessage(title),
            I18nUtil.formatMessage(msg),
            actions,
            { cancelable: false });
    });
});
// export default Util;