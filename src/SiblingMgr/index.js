import React, { PureComponent } from 'react';
// import { getTheme, ThemeContext } from 'react-native-material-ui';
import { Modal } from 'antd-mobile';
import { IntlProvider } from 'react-intl';
import { BackHandler } from 'yes';
import RootSiblings from 'react-native-root-siblings';
import { ControlMappings } from 'yes-platform';
import PropTypes from 'prop-types';

let modalHandler = null;
BackHandler.addPreEventListener(() => {
    if (modalHandler) {
        modalHandler.destroy();
        modalHandler = null;
        return false;
    }
    return true;
});

const onModalClose = () => {
    if (modalHandler) {
        modalHandler.destroy();
        modalHandler = null;
    }
}

const getMappedComponent = (tag) => {
    return ControlMappings.defaultControlMapping.get(tag);
}
// const Context = React.createContext({
//     getMappedComponent
// });
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
export function showModal(children) {
    if (modalHandler) {
        modalHandler.destroy();
        modalHandler = null;
    }
    modalHandler = new RootSiblings(
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
        </IntlProvider>)

}

