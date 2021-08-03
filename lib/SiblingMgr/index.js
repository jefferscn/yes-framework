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
// import { getTheme, ThemeContext } from 'react-native-material-ui';
import { BackHandler, AppDispatcher } from 'yes';
import RootSiblings from 'react-native-root-siblings';
import { ControlMappings } from 'yes-comp-react-native-web';
import { History } from 'yes-web';
import PropTypes from 'prop-types';
import { YIGOEnvProvider } from 'yes-intf';
import AppWrapper from '../AppWrapper';
import i18n from '../i18n';
// import control from '../config/control.js';
// import { ProjectCfg, billforms } from '../config/index';
import global from 'global';
// let modalHandler = null;
var siblingKey = 0;
var inited = false;
var control = null;
var ProjectCfg = null;
var billforms = [];
export var init = function (c, p, b) {
    control = c;
    ProjectCfg = p;
    billforms = b;
    inited = true;
};
var getLocaleMessages = function () {
    if (navigator.language.startsWith('zh')) {
        return i18n['zh-CN'];
    }
    return i18n['en-US'];
};
var modalStack = [];
global.modalStack = modalStack;
AppDispatcher.register(function (action) {
    switch (action.type) {
        case 'LOGOUTED':
            modalStack.forEach(function (item) {
                item();
            });
            break;
    }
});
var getMappedComponent = function (tag) {
    return ControlMappings.defaultControlMapping.get(tag);
};
var DummyApp = /** @class */ (function (_super) {
    __extends(DummyApp, _super);
    function DummyApp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DummyApp.prototype.getChildContext = function () {
        return {
            getMappedComponent: getMappedComponent,
        };
    };
    DummyApp.prototype.render = function () {
        return this.props.children;
    };
    DummyApp.childContextTypes = {
        getMappedComponent: PropTypes.func,
    };
    return DummyApp;
}(PureComponent));
function createCallback(mh) {
    var fn = function () {
        if (mh) {
            mh.destroy();
            var index = modalStack.indexOf(fn);
            if (index < 0) {
                console.error("siblingmgr error!");
            }
            else {
                modalStack.splice(index, 1);
            }
            mh = null;
        }
    };
    modalStack.push(fn);
    return fn;
}
export function showModal(children, fullScreen) {
    var closeModal = function () {
        backHandler();
        callback();
    };
    var modalHandler = new RootSiblings(React.createElement(YIGOEnvProvider, { locale: getLocaleMessages(), controlMapping: ControlMappings.defaultControlMapping },
        React.createElement(AppWrapper, { formTemplates: billforms, control: control, projectCfg: ProjectCfg }, React.cloneElement(children, {
            onClose: closeModal
        }))));
    History.push("#Sibling_" + siblingKey++);
    var callback = createCallback(modalHandler);
    var backHandler = BackHandler.addPreEventListener(function () {
        backHandler();
        callback();
    });
    return function () {
        backHandler();
        callback();
    };
}
