import { YIUI, View } from 'yes-core';
import { History } from 'yes-platform';

View.FuncMap.put('OpenWorkitem',
    async function (name, cxt, args) {
        var form = cxt.form;
        var onlyOpen = false;
        var loadInfo = true;
        if (args.length > 1) {
            onlyOpen = YIUI.TypeConvertor.toBoolean(args[1]);
        }
        if (args.length > 2) {
            loadInfo = YIUI.TypeConvertor.toBoolean(args[2]);
        }
        const workitemID = args[0];
        // 读取对应的单据的key
        const workitemInfo = await YIUI.BPMService.loadWorkitemInfo(workitemID);
        if(!workitemInfo) {
            return;
        }
        // History.push(`card/WORKITEM/${workitemID}/false/true`);
        window.parent.postMessage({
            type: 'OpenWorkitem',
            formKey: workitemInfo.FormKey,
            workitemID,
            oid: workitemInfo.OID,
            onlyOpen,
            loadInfo,
        })
    }
);