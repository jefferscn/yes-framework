import { YIUI } from 'yes-core';
import './exprhandlermap';
import './baseexprhandler';
import { CalcItem, ExprItemPos, EnableItemSet, VisibleItem, 
    VisibleItemSet, EnableItem, CheckItemSet, CheckItem } from './formdepend';

var GridExprHandler = YIUI.extend(YIUI.BaseExprHandler, {

    doCalcItemInit: function (meta) {
        var rows = meta.rows;

        var self = this, items = [];

        rows.forEach(function (row) {
            if (row.rowType == 'Detail' || row.rowType == 'Fix') {
                var index = 0;
                row.cells.forEach(function (cell) {
                    var cellKey = cell.key;
                    if (cellKey) {
                        var binding = cell.dataBinding;
                        var defaultValue = binding ? binding.defaultValue : '';
                        var formulaValue = binding ? binding.defaultFormulaValue : '';
                        var valueDependency = binding ? binding.valueDependency : '';

                        var item = self.createCalcItem(
                            cellKey,
                            meta.key,
                            row.rowType == 'Detail' ? CalcItem.List : CalcItem.Head,
                            defaultValue,
                            formulaValue,
                            valueDependency);

                        var pos = new ExprItemPos();
                        pos.setIndex(index);
                        item.setPos(pos);

                        if (row.rowType == 'Detail' && meta.hasTree) {
                            item.setTreeSum(item.getFormulaValue() && item.getFormulaValue().indexOf('Sum(') != -1);
                        }

                        items.push(item);
                    }
                    index++;
                });
            }
        });

        return items;
    },

    doEnableItemInit: function (meta, tree) {
        var self = this;

        var getCellEnable = function (metaCell, index) {
            var o = {};
            o.enable = metaCell.enable;
            o.enableDependency = metaCell.enableDependency;
            if (!o.enable) {
                var column = meta.leafColumns[index];
                o.enable = column.enable;
                o.enableDependency = column.enableDependency;
                if (!o.enable) {
                    o.enable = meta.enable;
                    o.enableDependency = meta.enableDependency;
                }
            }
            return o;
        };

        var metaKey = meta.key;
        if (metaKey) {
            var item = self.createEnableItem(
                metaKey,
                metaKey,
                EnableItem.Head,
                meta.enable,
                meta.enableDependency);

            tree.add(item);

            var itemSet = new EnableItemSet(metaKey);
            tree.add(itemSet);

            var rows = meta.rows;
            rows.forEach(function (row) {
                if (row.rowType == 'Detail' || row.rowType == 'Fix') {
                    var index = 0;
                    row.cells.forEach(function (cell) {
                        var cellKey = cell.key;
                        if (cellKey) {
                            var cellO = getCellEnable(cell, index);

                            var item = self.createEnableItem(
                                cellKey,
                                meta.key,
                                row.rowType == 'Detail' ? EnableItem.List : EnableItem.Head,
                                cellO.enable,
                                cellO.enableDependency);

                            var pos = new ExprItemPos();
                            pos.setIndex(index);
                            item.setPos(pos);

                            if (item.type == EnableItem.List) {
                                itemSet.add(item);
                            } else {
                                tree.add(item);
                            }
                        }
                        index++;
                    });
                }
            });
        }
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

            var buildColumnsVisible = function (meta, columns, itemSet, refIndex) {
                columns.forEach(function (column) {
                    var _columns = column.columns;
                    if (_columns && _columns.length > 0) {
                        buildColumnsVisible(meta, _columns, itemSet, refIndex);
                    } else {
                        buildColumnVisible(meta, column, itemSet, refIndex);
                    }
                });
            }

            var buildColumnVisible = function (meta, metaColumn, itemSet, refIndex) {
                var colKey = metaColumn.key;
                var item = self.createVisibleItem(
                    colKey,
                    meta.key,
                    VisibleItem.Column,
                    metaColumn.visible,
                    metaColumn.visibleDependency);

                var index = refIndex.index;
                var pos = new ExprItemPos();
                pos.setIndex(index);
                item.setPos(pos);
                itemSet.add(item);
                refIndex.index = index + 1;

                itemSet.add(item);
            }

            // 列
            var columns = meta.columns;
            var refIndex = { index: 0 };
            var itemSet = new VisibleItemSet(metaKey);
            tree.add(itemSet);

            buildColumnsVisible(meta, columns, itemSet, refIndex);

            var rows = meta.rows;
            rows.forEach(function (row) {
                if (row.rowType !== 'Detail' && row.visible) {
                    var item = self.createVisibleItem(
                        row.key,
                        metaKey,
                        VisibleItem.Row,
                        row.visible
                    );
                    tree.put(row.key, item);
                }
            });
        }
    },

    doCheckItemInit: function (meta, tree) {
        var self = this;

        var metaKey = meta.key;

        var itemSet = new CheckItemSet(metaKey);
        tree.add(itemSet);

        var rows = meta.rows;
        rows.forEach(function (row) {
            if (row.rowType == 'Detail' || row.rowType == 'Fix') {
                var index = 0;
                row.cells.forEach(function (cell) {
                    var cellKey = cell.key;
                    if (cellKey) {
                        var binding = cell.dataBinding;
                        var checkRule = binding ? binding.checkRule : '';
                        var errorInfo = binding ? binding.errorInfo : '';
                        var isRequired = binding ? binding.required : '';
                        var checkDependency = binding ? binding.checkDependency : '';

                        var item = self.createCheckItem(
                            cellKey,
                            meta.key,
                            row.rowType == 'Detail' ? CheckItem.List : CheckItem.Head,
                            checkRule,
                            errorInfo,
                            isRequired,
                            checkDependency);

                        var pos = new ExprItemPos();
                        pos.setIndex(index);
                        item.setPos(pos);

                        if (item.type == CheckItem.List) {
                            itemSet.add(item);
                        } else {
                            tree.add(item);
                        }
                    }
                    index++;
                });

                // 行的检查规则
                if (row.rowType == 'Detail') {
                    var items = self.createCheckItems(row.key, metaKey, row.checkRules);
                    if (items && items.length > 0) {
                        tree.setRowItems(row.key, items);
                    }
                }
            }
        });
    }
});

YIUI.ExprHandlerMap.getInstance().reg(YIUI.CONTROLTYPE.GRID, GridExprHandler);