import { YIUI } from 'yes-core';
import './exprhandlermap';
import './baseexprhandler';
import { CalcItem, ExprItemPos, EnableItemSet, VisibleItem, VisibleItemSet, EnableItem, CheckItem } from './formdepend';
var ListViewExprHandler = YIUI.extend(YIUI.BaseExprHandler, {
    doCalcItemInit: function (metaLV) {
        var columns = metaLV.columnInfo;
        var self = this, items = [];
        var index = 0;
        columns.forEach(function (column) {
            var colKey = column.key;
            if (colKey) {
                var binding = column.dataBinding;
                var defaultValue = binding ? binding.defaultValue : '';
                if (!defaultValue) {
                    defaultValue = column.defaultValue;
                }
                var formulaValue = binding ? binding.defaultFormulaValue : '';
                if (!formulaValue) {
                    formulaValue = column.formulaValue;
                }
                var valueDependency = binding ? binding.valueDependency : '';
                if (!valueDependency) {
                    valueDependency = column.valueDependency;
                }
                var item = self.createCalcItem(colKey, metaLV.key, CalcItem.List, defaultValue, formulaValue, valueDependency);
                var pos = new ExprItemPos();
                pos.setIndex(index);
                item.setPos(pos);
                items.push(item);
            }
            index++;
        });
        return items;
    },
    doEnableItemInit: function (metaLV, tree) {
        var metaKey = metaLV.key;
        var self = this;
        if (metaKey) {
            var item = self.createEnableItem(metaKey, metaKey, EnableItem.Head, metaLV.enable, metaLV.enableDependency);
            tree.add(item);
            var itemSet = new EnableItemSet(metaKey);
            tree.add(itemSet);
            var index = 0;
            metaLV.columnInfo.forEach(function (column) {
                var colKey = column.key;
                if (colKey) {
                    var item = self.createEnableItem(colKey, metaKey, EnableItem.List, column.enable, column.enableDependency);
                    var pos = new ExprItemPos();
                    pos.setIndex(index);
                    item.setPos(pos);
                    itemSet.add(item);
                }
                index++;
            });
        }
    },
    doVisibleItemInit: function (metaLV, tree) {
        var metaKey = metaLV.key;
        var self = this;
        if (metaKey) {
            var item = self.createVisibleItem(metaKey, metaKey, VisibleItem.Head, metaLV.visible, metaLV.visibleDependency);
            tree.add(item);
            var itemSet = new VisibleItemSet(metaKey);
            tree.add(itemSet);
            var index = 0;
            metaLV.columnInfo.forEach(function (column) {
                var colKey = column.key;
                if (colKey) {
                    var item = self.createVisibleItem(colKey, metaKey, VisibleItem.Column, column.visible, column.visibleDependency);
                    var pos = new ExprItemPos();
                    pos.setIndex(index);
                    item.setPos(pos);
                    itemSet.add(item);
                }
                index++;
            });
        }
    },
    doCheckItemInit: function (metaLV, tree) {
        var metaKey = metaLV.key;
        var self = this;
        if (metaKey) {
            var itemSet = new VisibleItemSet(metaKey);
            tree.add(itemSet);
            var index = 0;
            metaLV.columnInfo.forEach(function (column) {
                var colKey = column.key;
                if (colKey) {
                    var binding = column.dataBinding;
                    var checkRule = binding ? binding.checkRule : '';
                    var errorInfo = binding ? binding.errorInfo : '';
                    var isRequired = binding ? binding.required : '';
                    var checkDependency = binding ? binding.checkDependency : '';
                    var item = self.createCheckItem(colKey, metaKey, CheckItem.List, checkRule, errorInfo, isRequired, checkDependency);
                    var pos = new ExprItemPos();
                    pos.setIndex(index);
                    item.setPos(pos);
                    itemSet.add(item);
                }
                index++;
            });
        }
    }
});
YIUI.ExprHandlerMap.getInstance().reg(YIUI.CONTROLTYPE.TILEDLIST, ListViewExprHandler);
YIUI.ExprHandlerMap.getInstance().reg(YIUI.CONTROLTYPE.GALLERY, ListViewExprHandler);
YIUI.ExprHandlerMap.getInstance().reg(YIUI.CONTROLTYPE.ROTATOR, ListViewExprHandler);
YIUI.ExprHandlerMap.getInstance().reg(YIUI.CONTROLTYPE.ROTATORLIST, ListViewExprHandler);
YIUI.ExprHandlerMap.getInstance().reg(YIUI.CONTROLTYPE.WATERFALL, ListViewExprHandler);
YIUI.ExprHandlerMap.getInstance().reg(YIUI.CONTROLTYPE.LISTVIEW, ListViewExprHandler);
YIUI.ExprHandlerMap.getInstance().reg(YIUI.CONTROLTYPE.LISTLAYOUTVIEW, ListViewExprHandler);
