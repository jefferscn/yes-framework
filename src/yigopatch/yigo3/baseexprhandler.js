import { YIUI } from 'yes-core';
import { VisibleItem, CalcItem, Item, CheckItem, EnableItem } from './formdepend';

export default YIUI.BaseExprHandler = YIUI.extend({
    init: function(form) {
        this.form = form;
    },

    createCalcItem: function(target,source,type,defaultV,formulaV,depend) {
        var item = new CalcItem(target,source,type);
        var variant = this.form.variant;
        var defaultValue = variant == null ? defaultV : variant.getDefaultValue(target,defaultV);
        var formulaValue = variant == null ? formulaV : variant.getFormulaValue(target,formulaV);
        var depend       = variant == null ? depend : variant.getFormulaDep(target,depend);
        
        item.setDefaultValue(defaultValue);
        item.setFormulaValue(formulaValue);

        if( depend ) {
            item.addDepends(depend.split(','));
        }

        return item;
    },

    createEnableItem: function(target,source,type,enable,depend) {
        var item = new EnableItem(target,source,type);
        var variant = this.form.variant;
        var vItem = variant == null ? null : variant.getEnable(target);
        if( vItem ) {
            if( vItem.getOption() == Variant.addition ) {
                if( enable ) {
                    item.addItem(new Item(enable));
                }
            }
            vItem.getValues().forEach(function(value){
                if( value ) item.addItem(new Item(value));
            });
        } else {
            if( enable ) {
                item.addItem(new Item(enable));
            }
        }
        vItem = variant == null ? null : variant.getEnableDep(target);
        if( vItem ) {
            if( vItem.getOption() == Variant.addition ) {
                if( depend ) {
                    item.addDepends(depend.split(','));
                }
            } 
            item.addDepend(depend);
        } else {
            if( depend ) {
                item.addDepends(depend.split(','));
            }
        }
        return item;
    },

    createVisibleItem: function(target,source,type,visible,depend) {
        var item = new VisibleItem(target,source,type);
        var variant = this.form.variant;
        var vItem = variant == null ? null : variant.getVisible(target);
        if( vItem ) {
            if( vItem.getOption() == Variant.addition ) {
                if( visible ) {
                    item.addItem(new Item(visible));
                }
            }
            vItem.getValues().forEach(function(value){
                if( value ) item.addItem(new Item(value));
            });
        } else {
            if( visible ) {
                item.addItem(new Item(visible));
            }
        }
        vItem = variant == null ? null : variant.getVisibleDep(target);
        if( vItem ) {
            if( vItem.getOption() == Variant.addition ) {
                if( depend ) {
                    item.addDepends(depend.split(','));
                }
            } 
            item.addDepend(depend);
        } else {
            if( depend ) {
                item.addDepends(depend.split(','));
            }
        }
        return item;
    },

    createCheckItem: function(target,source,type,checkRule,errorInfo,required,depend) {
        var item = new CheckItem(target,source,type);
        var variant = this.form.variant;
        var vItem = variant == null ? null : variant.getCheckRule(target);
        if( vItem ) {
            if( vItem.getOption() == Variant.addition ) {
                if( checkRule ) {
                    item.addItem(new Item(checkRule));
                }
            }
            vItem.getValues().forEach(function(value){
                if( value ) item.addItem(new Item(value));
            });
        } else {
            if( checkRule ) {
                item.addItem(new Item(checkRule));
            }
        }
        vItem = variant == null ? null : variant.getCheckRuleDep(target);
        if( vItem ) {
            if( vItem.getOption() == Variant.addition ) {
                if( depend ) {
                    item.addDepends(depend.split(','));
                }
            } 
            item.addDepend(depend);
        } else {
            if( depend ) {
                item.addDepends(depend.split(','));
            }
        }

        // 不需要做国际化,json过来已经做完
        item.setErrorMsg(variant == null ? errorInfo : variant.getErrorInfo(target));
        item.setRequired(variant == null ? required : variant.getRequired(target,required));

        return item;
    },

    getValueChanged: function(key,defaultValue){
        var events = [];
        var variant = this.form.variant;
        var vItem = variant == null ? null : variant.getValueChanged(key);
        if( vItem ) {
            if( vItem.option == Variant.addition ) {
                if( defaultValue ) events.push(defaultValue);
            }
            vItem.values.forEach(function(value){
                if( value ) event.push(value);
            });
        } else {
            if( defaultValue ) events.push(defaultValue);
        }
        return events;
    },

    createCheckItems: function(target,source,collection) {
        var variant = this.form.variant;
        var vItem = variant == null ? null : variant.getCheckRule(target);
        var items = null;
        if( vItem ) {
            if( vItem.getOption() == Variant.addition ) {
                items = this.impl_createCheckRules(collection);
            }
            items = items || [];
            vItem.getValues().forEach(function(value){
                if( value ) {
                    var item = new CheckItem(target,source,CheckItem.Global);
                    item.addItem(new Item(value));
                    items.push(item);
                }
            });
        } else {
            items = this.impl_createCheckRules(collection);
        }
        return items;
    },

    impl_createCheckRules: function(collection) {
        if( collection && collection.length > 0 ) {
            var self = this,items = [];
            collection.forEach(function(rule){
                if( rule.content ) {
                    var item = new CheckItem(self.form.formKey,self.form.formKey,CheckItem.Global);
                    item.addItem(new Item(rule.content));
                    item.setErrorMsg(rule.errorInfo);
                    items.push(item);
                }
            });
            return items;
        }
    }

});