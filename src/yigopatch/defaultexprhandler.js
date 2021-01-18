import { YIUI } from 'yes-core';
import './exprhandlermap';
import './baseexprhandler';
import { VisibleItem, EnableItem, CalcItem, CheckItem } from './formdepend';

var DefaultExprHandler = YIUI.extend(YIUI.BaseExprHandler, {

    doCalcItemInit: function (meta) {
        var metaKey = meta.key;
        var items = [];
        if (metaKey) {
            var binding = meta.dataBinding;
            var defaultValue = binding ? binding.defaultValue : '';
            var formulaValue = binding ? binding.defaultFormulaValue : '';
            var valueDependency = binding ? binding.valueDependency : '';

            var item = this.createCalcItem(
                metaKey,
                metaKey,
                CalcItem.Head,
                defaultValue,
                formulaValue,
                valueDependency);

            items.push(item);
        }
        return items;
    },

    doEnableItemInit: function (meta, tree) {
        var metaKey = meta.key;
        if (metaKey) {
            var item = this.createEnableItem(
                metaKey,
                metaKey,
                EnableItem.Head,
                meta.enable,
                meta.enableDependency);
            tree.add(item);
        }
    },

    doVisibleItemInit: function (meta, tree) {
        var metaKey = meta.key;
        if (metaKey) {
            var item = this.createVisibleItem(
                metaKey,
                metaKey,
                VisibleItem.Head,
                meta.visible,
                meta.visibleDependency);
            tree.add(item);
        }
    },

    doCheckItemInit: function (meta, tree) {
        var metaKey = meta.key;
        if (metaKey) {
            var binding = meta.dataBinding;
            var checkRule = binding ? binding.checkRule : '';
            var errorInfo = binding ? binding.errorInfo : '';
            var isRequired = binding ? binding.required : '';
            var checkDependency = binding ? binding.checkDependency : '';

            var item = this.createCheckItem(
                metaKey,
                metaKey,
                CheckItem.Head,
                checkRule,
                errorInfo,
                isRequired,
                checkDependency);

            tree.add(item);
        }
    },

    doOperationEnableInit: function (tree) {
        var self = this;
        this.form.metaForm.operations.forEach(function (opt) {
            var item = self.createEnableItem(
                opt.key,
                opt.key,
                EnableItem.Operation,
                opt.enableCnt,
                opt.enableDependency);
            tree.add(item);
        });
    },

    doOperationVisibleInit: function (tree) {
        var self = this;
        this.form.metaForm.operations.forEach(function (opt) {
            var item = self.createVisibleItem(
                opt.key,
                opt.key,
                VisibleItem.Operation,
                opt.visibleCnt,
                opt.visibleDependency);
            tree.add(item);
        });
    },

    doGlobalCheckInit: function (tree) {
        var metaForm = this.form.metaForm;
        var items = this.createCheckItems(metaForm.key, metaForm.key, metaForm.uichecks);
        tree.setGlobalItems(items);
    }

});

YIUI.ExprHandlerMap.getInstance().reg(0, DefaultExprHandler);

export default DefaultExprHandler
