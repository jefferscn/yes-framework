import AppState from './AppState';
import { View, YIUI } from 'yes-core';
const store = new AppState();
/**
 * 重写OpenWorkitem方法，
 */
View.FuncMap.put('OpenWorkitem', 
    async function (name, cxt, args) {
        const wid= args[0];
        const workitemInfo = await YIUI.BPMService.loadWorkitemInfo(wid);
        if(workitemInfo) {
            const { FormKey, OID } = workitemInfo;
            store.openForm(FormKey, OID);
        }
    }
);
export default store;
