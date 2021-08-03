var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React, { PureComponent } from 'react';
import { openForm, openModal } from '../../util/navigateUtil';
import { ActionSheet } from 'antd-mobile';
import { BackHandler } from 'yes-intf';
import { History } from 'yes-web';
import PropTypes from 'prop-types';
var OpenFormClick = /** @class */ (function (_super) {
    __extends(OpenFormClick, _super);
    function OpenFormClick() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.openForm = function () {
            _this._openForm(_this.props);
        };
        _this._openForm = function (item) {
            var formKey = item.formKey, oid = item.oid, status = item.status, modal = item.modal;
            if (modal) {
                openModal(formKey, oid, status);
                return;
            }
            openForm(formKey, oid, status);
        };
        _this.onPress = function () {
            var multiple = _this.props.multiple;
            if (!multiple) {
                _this.openForm();
                return;
            }
            _this.onActionClick();
        };
        _this.onButtonClick = function (index) {
            var items = _this.props.items;
            var item = items[index];
            _this.backHandler();
            if (item) {
                _this._openForm(item);
            }
        };
        _this.onActionClick = function () {
            var items = _this.props.items;
            var itms = items.map(function (item) { return item.text; });
            itms.push('取消');
            ActionSheet.showActionSheetWithOptions({
                options: itms,
                cancelButtonIndex: itms.length - 1,
                message: null,
                maskClosable: true,
            }, _this.onButtonClick);
            History.push("#ActionSheet", false);
            _this.backHandler = BackHandler.addPreEventListener(function () {
                ActionSheet.close();
                _this.backHandler();
                return false;
            });
            return;
        };
        return _this;
    }
    OpenFormClick.prototype.render = function () {
        // const { style, multiple } = this.props;
        // if (!multiple) {
        //     return (
        //         <ActionButton onPress={this.openForm} style={style} />
        //     )
        // }
        // return (
        //     <ActionButton onPress={this.onActionClick} style={style} />
        // )
        var _a = this.props, element = _a.element, children = _a.children;
        var child = this.context.createElement(element || children);
        return React.cloneElement(child, {
            onPress: this.onPress,
        });
    };
    OpenFormClick.contextTypes = {
        createElement: PropTypes.func,
    };
    OpenFormClick.defaultProps = {
        status: 'EDIT',
        modal: false,
        multiple: false,
    };
    return OpenFormClick;
}(PureComponent));
export default OpenFormClick;
