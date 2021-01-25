import { YIUI } from 'yes-core';
import './exprhandlermap';
import './baseexprhandler';

var TabGroupExprHandler = YIUI.extend(YIUI.BaseExprHandler, {

    doCalcItemInit: function (meta) {

    },

    doEnableItemInit: function (meta) {

    },

    doVisibleItemInit: function (meta, tree) {
        var self = this;

        var metaKey = meta.key;
        if (metaKey) {
            var item = self.createVisibleItem(
                metaKey,
                metaKey,
                VisibleItem.Head,
                meta.visible,
                meta.visibleDependency);

            tree.add(item);

            var items = meta.items;
            if (items) {
                items.forEach(function (item) {
                    var comKey = item.key;
                    if (comKey) {
                        var item = self.createVisibleItem(
                            comKey,
                            metaKey,
                            VisibleItem.Head,
                            item.visible,
                            item.visibleDependency
                        );
                        tree.add(item);
                    }
                });
            }
        }
    },

    doCheckItemInit: function (meta) {

    },

});

YIUI.ExprHandlerMap.getInstance().reg(YIUI.CONTROLTYPE.TABGROUP, TabGroupExprHandler);
