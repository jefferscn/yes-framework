import React, { PureComponent } from 'react';
// import { getTheme, ThemeContext } from 'react-native-material-ui';
import { Modal } from 'antd-mobile';
import { IntlProvider } from 'react-intl';
import { BackHandler } from 'yes';
import RootSiblings from 'react-native-root-siblings';
import { ControlMappings } from 'yes-platform';
import PropTypes from 'prop-types';

// let modalHandler = null;
const modalStack = [];
BackHandler.addPreEventListener(() => {
    const cb = modalStack.shift();
    if (cb) {
        cb();
        return false;
    }
    return true;
});

const onModalClose = () => {
    // if (modalHandler) {
    //     modalHandler.destroy();
    //     modalHandler = null;
    // }
    const cb = modalStack.shift();
    if (cb) {
        cb();
    }
}

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
            if(index<0) {
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
export function showModal(children) {
    // if (modalHandler) {
    //     modalHandler.destroy();
    //     modalHandler = null;
    // }
    const modalHandler = new RootSiblings(
        <IntlProvider>
            <DummyApp>
                {/* <ThemeContext.Provider value={getTheme({})}> */}
                <Modal
                    wrapClassName='sibling'
                    transparent
                    visible
                    onClose={onModalClose}
                >
                    {children}
                </Modal>
                {/* </ThemeContext.Provider> */}
            </DummyApp>
        </IntlProvider>);
    return createCallback(modalHandler);
}

