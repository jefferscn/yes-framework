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
import { SearchBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import { ControlWrap as controlWrap } from 'yes';
var YigoSearchbar = /** @class */ (function (_super) {
    __extends(YigoSearchbar, _super);
    function YigoSearchbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            searchingText: '',
            lastSearchingText: '',
        };
        _this.onSubmit = function (value) {
            if (value === _this.state.lastSearchingText) {
                return;
            }
            _this.setState({
                searchingText: value,
                lastSearchingText: value,
            });
            _this.context.onValueChange(_this.props.textField, value);
            _this.context.onControlClick(_this.props.searchButton);
        };
        _this.onChange = function (value) {
            _this.setState({
                searchingText: value,
            });
        };
        _this.onBlur = function () {
            _this.onSubmit(_this.state.searchingText);
        };
        return _this;
    }
    YigoSearchbar.prototype.componentWillReceiveProps = function (props) {
        this.setState({
            searchingText: props.displayValue,
            lastSearchingText: props.displayValue,
        });
    };
    YigoSearchbar.prototype.render = function () {
        return (React.createElement(SearchBar, { value: this.state.searchingText, placeholder: this.props.placeholder || '搜索', onChange: this.onChange, onBlur: this.onBlur, onSubmit: this.onSubmit, onClear: this.onSubmit }));
    };
    YigoSearchbar.contextTypes = {
        getContextComponentState: PropTypes.func,
        onValueChange: PropTypes.func,
        onControlClick: PropTypes.func,
    };
    return YigoSearchbar;
}(PureComponent));
export default controlWrap(YigoSearchbar);
