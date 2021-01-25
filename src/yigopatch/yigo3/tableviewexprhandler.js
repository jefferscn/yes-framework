import { YIUI } from 'yes-core';
import './exprhandlermap';
import './baseexprhandler';

var TableViewExprHandler = YIUI.extend(YIUI.BaseExprHandler, {

    doCalcItemInit: function (meta) {
        var self = this, items = [];

        var buildTableViewDetailRowItems = function (rowKey, meta) {
            var metaKey = meta.key;
            if (metaKey && !meta.items) {
                var binding = meta.dataBinding;
                var defaultValue = binding ? binding.defaultValue : '';
                var formulaValue = binding ? binding.defaultFormulaValue : '';
                var valueDependency = binding ? binding.valueDependency : '';

                var item = self.createCalcItem(
                    metaKey,
                    rowKey,
                    CalcItem.List,
                    defaultValue,
                    formulaValue,
                    valueDependency);

                var pos = new ExprItemPos();
                pos.setIndex(-1);
                item.setPos(pos);

                items.push(item);
            }

            if (meta.items) {
                meta.items.forEach(function (item) {
                    buildTableViewDetailRowItems(rowKey, item);
                });
            }
        }

        var buildTableViewFixRowItems = function (meta) {
            var metaKey = meta.key;
            if (metaKey) {
                var binding = meta.dataBinding;
                var defaultValue = binding ? binding.defaultValue : '';
                var formulaValue = binding ? binding.defaultFormulaValue : '';
                var valueDependency = binding ? binding.valueDependency : '';

                var item = self.createCalcItem(
                    metaKey,
                    metaKey,
                    CalcItem.Head,
                    defaultValue,
                    formulaValue,
                    valueDependency);

                items.push(item);
            }

            if (meta.items) {
                meta.items.forEach(function (item) {
                    buildTableViewFixRowItems(item);
                });
            }
        }

        var rows = meta.rows;
        if (rows) {
            var index = 0;
            rows.forEach(function (metaRow) {
                if (metaRow.rowType == YIUI.RowType.FIXED) {
                    buildTableViewFixRowItems(metaRow.root);
                } else if (metaRow.rowType == YIUI.RowType.GROUP) {
                    var nextRow = null;
                    if (index + 1 < rows.length) {
                        nextRow = rows[index + 1];
                    }
                    if (nextRow && nextRow.rowType != YIUI.RowType.DETAIL) {
                        buildTableViewFixRowItems(metaRow.root);
                    }
                } else if (metaRow.rowType == YIUI.RowType.GROUPTAIL) {
                    var preRow = null;
                    if (index - 1 >= 0) {
                        preRow = rows[index - 1];
                    }
                    if (preRow && preRow.rowType != YIUI.RowType.DETAIL) {
                        buildTableViewFixRowItems(preRow.root);
                    }
                } else if (metaRow.rowType == YIUI.RowType.DETAIL) {
                    buildTableViewDetailRowItems(metaRow.key, metaRow.root);
                }
                index++;
            });
        }
        return items;
    },

    doEnableItemInit: function (meta, tree) {
        var self = this;

        var build = function (meta) {
            var metaKey = meta.key;
            if (metaKey) {
                var item = self.createEnableItem(
                    metaKey,
                    metaKey,
                    EnableItem.Head,
                    meta.enable,
                    meta.enableDependency);

                tree.add(item);
            }
        }

        var buildItems = function (metaPanel) {
            build(metaPanel);

            var items = metaPanel.items;
            if (items) {
                items.forEach(function (item) {
                    buildItems(item);
                });
            }
        }

        var buildTableViewItems = function () {
            var rows = meta.rows;
            if (!rows) return;
            var index = 0;
            rows.forEach(function (metaRow) {
                if (metaRow.rowType == YIUI.RowType.FIXED) {
                    buildItems(metaRow.root);
                } else if (metaRow.rowType == YIUI.RowType.GROUP) {
                    var nextRow = null;
                    if (index + 1 < rows.length) {
                        nextRow = rows[index + 1];
                    }
                    if (nextRow && nextRow.rowType != YIUI.RowType.DETAIL) {
                        buildItems(metaRow.root);
                    }
                } else if (metaRow.rowType == YIUI.RowType.GROUPTAIL) {
                    var preRow = null;
                    if (index - 1 >= 0) {
                        preRow = rows[index - 1];
                    }
                    if (preRow && preRow.rowType != YIUI.RowType.DETAIL) {
                        buildItems(preRow.root);
                    }
                } else if (metaRow.rowType == YIUI.RowType.DETAIL) {
                    var refIndex = { index: 0 };
                    var itemSet = new VisibleItemSet(metaRow.key);
                    tree.add(itemSet);

                    buildTableViewDetailRowColumns(metaRow.key, metaRow.root, refIndex, itemSet);
                }
                index++;
            });
        }

        var buildTableViewDetailRowColumns = function (rowKey, meta, refIndex, itemSet) {
            var comKey = meta.key;
            var item = self.createEnableItem(
                comKey,
                rowKey,
                EnableItem.Column,
                meta.enable,
                meta.enableDependency);

            var index = refIndex.index;
            var pos = new ExprItemPos();
            pos.setIndex(index);
            item.setPos(pos);
            itemSet.add(item);
            refIndex.index = index + 1;

            var items = meta.items;
            if (items) {
                items.forEach(function (item) {
                    buildTableViewDetailRowColumns(rowKey, item, refIndex, itemSet);
                });
            }
        }

        var buildTableViewRows = function () {
            var rows = meta.rows;
            if (!rows) return;
            rows.forEach(function (metaRow) {
                var metaKey = metaRow.key;
                if (metaKey) {
                    var item = self.createEnableItem(
                        metaKey,
                        metaKey,
                        EnableItem.Head,
                        metaRow.enable,
                        metaRow.enableDependency);
                    tree.add(item);
                }
            });
        }

        // 本身
        build(meta);

        // 行内部
        buildTableViewItems();

        // 行本身
        buildTableViewRows();
    },

    doVisibleItemInit: function (meta, tree) {
        var self = this;

        var build = function (meta) {
            var metaKey = meta.key;
            if (metaKey) {
                var item = self.createVisibleItem(
                    metaKey,
                    metaKey,
                    VisibleItem.Head,
                    meta.visible,
                    meta.visibleDependency);

                tree.add(item);
            }
        }

        var buildItems = function (metaPanel) {
            build(metaPanel);

            var items = metaPanel.items;
            if (items) {
                items.forEach(function (item) {
                    buildItems(item);
                });
            }
        }

        var buildTableViewItems = function () {
            var rows = meta.rows;
            if (!rows) return;
            var index = 0;
            rows.forEach(function (metaRow) {
                if (metaRow.rowType == YIUI.RowType.FIXED) {
                    buildItems(metaRow.root);
                } else if (metaRow.rowType == YIUI.RowType.GROUP) {
                    var nextRow = null;
                    if (index + 1 < rows.length) {
                        nextRow = rows[index + 1];
                    }
                    if (nextRow && nextRow.rowType != YIUI.RowType.DETAIL) {
                        buildItems(metaRow.root);
                    }
                } else if (metaRow.rowType == YIUI.RowType.GROUPTAIL) {
                    var preRow = null;
                    if (index - 1 >= 0) {
                        preRow = rows[index - 1];
                    }
                    if (preRow && preRow.rowType != YIUI.RowType.DETAIL) {
                        buildItems(preRow.root);
                    }
                } else if (metaRow.rowType == YIUI.RowType.DETAIL) {
                    var refIndex = { index: 0 };
                    var itemSet = new VisibleItemSet(metaRow.key);
                    tree.add(itemSet);

                    buildTableViewDetailRowItems(metaRow.key, metaRow.root, refIndex, itemSet);
                }
                index++;
            });
        }

        var buildTableViewDetailRowItems = function (rowKey, meta, refIndex, itemSet) {
            var item = self.createVisibleItem(
                meta.key,
                rowKey,
                VisibleItem.Column,
                meta.visible,
                meta.visibleDependency);

            var index = refIndex.index;
            var pos = new ExprItemPos();
            pos.setIndex(index);
            item.setPos(pos);
            itemSet.add(item);
            refIndex.index = index + 1;

            var items = meta.items;
            if (items) {
                items.forEach(function (item) {
                    buildTableViewDetailRowItems(rowKey, item, refIndex, itemSet);
                });
            }
        }

        var buildTableViewRows = function () {
            var rows = meta.rows;
            if (!rows) return;
            rows.forEach(function (metaRow) {
                var metaKey = metaRow.key;
                if (metaKey) {
                    var item = self.createVisibleItem(
                        metaKey,
                        metaKey,
                        VisibleItem.Head,
                        metaRow.visible,
                        metaRow.visibleDependency);
                    tree.add(item);
                }
            });
        }

        // 本身
        build(meta);

        // 行内部
        buildTableViewItems();

        // 行本身
        buildTableViewRows();
    },

    doCheckItemInit: function (meta, tree) {
        var self = this;

        var buildTableViewDetailRowItems = function (rowKey, meta, refIndex, itemSet) {
            var metaKey = meta.key;
            if (metaKey) {
                var binding = meta.dataBinding;
                var checkRule = binding ? binding.checkRule : '';
                var errorInfo = binding ? binding.errorInfo : '';
                var isRequired = binding ? binding.required : '';
                var checkDependency = binding ? binding.checkDependency : '';

                var item = self.createCheckItem(
                    metaKey,
                    rowKey,
                    CheckItem.List,
                    checkRule,
                    errorInfo,
                    isRequired,
                    checkDependency);

                var index = refIndex.index;
                var pos = new ExprItemPos();
                pos.setIndex(index);
                item.setPos(pos);
                refIndex.index = index + 1;

                itemSet.add(item);
            }

            if (meta.items) {
                meta.items.forEach(function (item) {
                    buildTableViewDetailRowItems(rowKey, item, refIndex, itemSet);
                });
            }
        }

        var buildTableViewFixRowItems = function (meta) {
            var metaKey = meta.key;
            if (metaKey) {
                var binding = meta.dataBinding;
                var checkRule = binding ? binding.checkRule : '';
                var errorInfo = binding ? binding.errorInfo : '';
                var isRequired = binding ? binding.required : '';
                var checkDependency = binding ? binding.checkDependency : '';

                var item = self.createCheckItem(
                    metaKey,
                    metaKey,
                    CheckItem.Head,
                    checkRule,
                    errorInfo,
                    isRequired,
                    checkDependency);

                tree.add(item);
            }

            if (meta.items) {
                meta.items.forEach(function (item) {
                    buildTableViewFixRowItems(item);
                });
            }
        }

        var rows = meta.rows;
        if (rows) {
            var index = 0;
            rows.forEach(function (metaRow) {
                if (metaRow.rowType == YIUI.RowType.FIXED) {
                    buildTableViewFixRowItems(metaRow.root);
                } else if (metaRow.rowType == YIUI.RowType.GROUP) {
                    var nextRow = null;
                    if (index + 1 < rows.length) {
                        nextRow = rows[index + 1];
                    }
                    if (nextRow && nextRow.rowType != YIUI.RowType.DETAIL) {
                        buildTableViewFixRowItems(metaRow.root);
                    }
                } else if (metaRow.rowType == YIUI.RowType.GROUPTAIL) {
                    var preRow = null;
                    if (index - 1 >= 0) {
                        preRow = rows[index - 1];
                    }
                    if (preRow && preRow.rowType != YIUI.RowType.DETAIL) {
                        buildTableViewFixRowItems(preRow.root);
                    }
                } else if (metaRow.rowType == YIUI.RowType.DETAIL) {
                    var refIndex = { index: 0 };
                    var itemSet = new CheckItemSet(metaRow.key);
                    tree.add(itemSet);

                    buildTableViewDetailRowItems(metaRow.key, metaRow.root, refIndex, itemSet);
                }
                index++;
            });
        }
    }

});

YIUI.ExprHandlerMap.getInstance().reg(YIUI.CONTROLTYPE.TABLEVIEW, TableViewExprHandler);
