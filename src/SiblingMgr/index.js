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
import control from '../config/control.js';
import { ProjectCfg, billforms } from '../config/index';
import global from 'global';

// let modalHandler = null;
let siblingKey = 0;
const getLocaleMessages = () => {
    if (navigator.language.startsWith('zh')) {
        return i18n['zh-CN'];
    }
    return i18n['en-US'];
}

const modalStack = [];
global.modalStack = modalStack;
AppDispatcher.register((action) => {
    switch (action.type) {
        case 'LOGOUTED':
            modalStack.forEach((item) => {
                item();
            });
            break;
    }
})
// BackHandler.addPreEventListener(() => {
//     const cb = modalStack[modalStack.length-1];
//     if (cb) {
//         cb();
//         return false;
//     }
//     return true;
// });

const getMappedComponent = (tag) => {
    return ControlMappings.defaultControlMapping.get(tag);
}
class DummyApp extends PureComponent {
    static childContextTypes = {
        getMappedComponent: PropTypes.func,
    };
    getChildContext() {
        return {
            getMappedComponent,
        };
    }
    render() {
        return this.props.children;
    }
}

function createCallback(mh) {
    const fn = function () {
        if (mh) {
            mh.destroy();
            const index = modalStack.indexOf(fn);
            if (index < 0) {
                console.error("siblingmgr error!");
            } else {
                modalStack.splice(index, 1);
            }
            mh = null;
        }
    }
    modalStack.push(fn);
    return fn;
}

export function showModal(children, fullScreen) {
    const closeModal = () => {
        backHandler();
        callback();
    }
    const modalHandler = new RootSiblings(
        <YIGOEnvProvider
            locale={getLocaleMessages()}
            controlMapping={ControlMappings.defaultControlMapping}
        >
            <AppWrapper
                formTemplates={billforms}
                control={control}
                projectCfg={ProjectCfg}
            >
                {
                    React.cloneElement(children, {
                        onClose: closeModal
                    })
                }
            </AppWrapper>
        </YIGOEnvProvider>
    );
    History.push(`#Sibling_${siblingKey++}`);
    const callback = createCallback(modalHandler);
    const backHandler = BackHandler.addPreEventListener(() => {
        backHandler();
        callback();
    });
    return () => {
        backHandler();
        callback();
    };
}
