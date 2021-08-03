import { Linking } from 'react-native';
import { Svr } from 'yes-core';

const yigoPreload = async () => {
    const params = {
        service: "GetPreLoadForm",
    };
    return await Svr.Request.getData(params);
}

export default (Preload) => {
    if(!Preload) {
        return;
    }
    const oldFunc = Linking.getInitialURL;
    /**
     * Preload
     *  condition   条件，只有在平台的preloadForm中出现的项目才会起作用，这里是一个path值
     *  force       是否无法关闭,默认不限制
     *  formKey     单据key
     *  status      单据状态
     *  oid         单据id
     */
    Linking.getInitialURL = async () => {
        try {
            if (!Preload) {
                return oldFunc ? await oldFunc() : null;
            }
            let data = Preload;
            if (typeof Preload === 'function') {
                data = await Preload();
            }
            if (!data) {
                return oldFunc ? await oldFunc() : null;
            }
            if (data.condition) {
                const preloadData = await yigoPreload();
                if (preloadData) {
                    if (!preloadData.find(item => item.path === data.condition)) {
                        return oldFunc ? await oldFunc() : null;
                    }
                }
            }
            return `://card/YES/${data.formKey}/${data.oid}/${data.status}`;
        } catch (ex) {
            return oldFunc ? await oldFunc() : null;
        }
    };
}