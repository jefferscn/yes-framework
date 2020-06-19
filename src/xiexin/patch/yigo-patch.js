import { View, YIUI } from 'yes-core';

View.FuncMap.put('RefreshUIFormula',
    async function (name, cxt, args) {
        // var form = cxt.form;

        // var calcAll = false;
        // if (args.length > 0) {
        //     calcAll = YIUI.TypeConvertor.toString(args[0]);
        // }

        // form.setSysExpVals("calcAll", calcAll);

        // await cxt.form.getUIProcess().calcAll();

        // form.removeSysExpVals("calcAll");

        return true;
    }
);
