import { YIUI } from 'yes-core';
import './exprhandlermap';
import './baseexprhandler';
var ContainerExprHandler = YIUI.extend(YIUI.BaseExprHandler, {
    doCalcItemInit: function (meta) {
    },
    doEnableItemInit: function (meta) {
    },
    doVisibleItemInit: function (meta, tree) {
        var self = this;
        var metaKey = meta.key;
        if (metaKey) {
            var item = self.createVisibleItem(metaKey, metaKey, VisibleItem.Head, meta.visible, meta.visibleDependency);
            tree.add(item);
        }
        var tabGroup = meta.tabGroup;
        if (tabGroup && tabGroup.items) {
            var itemSet = new VisibleItemSet(metaKey);
            var index = 0;
            tabGroup.items.forEach(function (com) {
                var comKey = com.key;
                if (comKey) {
                    var item = self.createVisibleItem(comKey, metaKey, VisibleItem.Column, com.visible, com.visibleDependency);
                    var pos = new ExprItemPos();
                    pos.setIndex(index);
                    item.setPos(pos);
                    itemSet.add(item);
                }
                index++;
            });
            tree.add(itemSet);
        }
    },
    doCheckItemInit: function (meta) {
    },
});
YIUI.ExprHandlerMap.getInstance().reg(YIUI.CONTROLTYPE.CONTAINER, ContainerExprHandler);
