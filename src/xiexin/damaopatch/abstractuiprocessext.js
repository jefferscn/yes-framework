import { YIUI } from 'yes-core';
import { lodash as $ } from 'yes-common';
YIUI.AbstractUIProcess.prototype = $.extend(YIUI.AbstractUIProcess.prototype, {
    init: function (form) {
        this.form = form;
        this.calcTree = this.form.dependency.calcTree;
        this.enableTree = this.form.dependency.enableTree;
        this.visibleTree = this.form.dependency.visibleTree;
        this.checkRuleTree = this.form.dependency.checkRuleTree;
    },
    calcCheckRule: async function (item, context) {
        let result = null;
        if (item.syntaxTree) {
            result = await this.form.evalByTree(item.syntaxTree, context, null);
        } else if (item.content) {
            result = await this.form.evalFormula(item.content, context, null);
        }
        if (result == null || (typeof result === 'string' && result === 'true')) {
            result = true;
        }
        return result;
    }
});