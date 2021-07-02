import React, { PureComponent } from 'react';
import { ComboboxWrap } from 'yes-intf';
import PropTypes from 'prop-types';
import Combobox from 'yes-comp-react-native-web/dist/components/Combobox';

class DictSelect_ extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
    }
    onPress = ()=> {
        // this.props.addNewRow && this.props.addNewRow();
        this.props.onChangePopupState(true);
    }
    render() {
        const { children, disabled } = this.props;
        if(disabled) {
            return null;
        }
        const child = this.context.createElement(children);
        return React.cloneElement(child, {
            onPress: this.onPress,
        });
    }
}

@ComboboxWrap
export default class ComboboxSelect extends PureComponent {
    render() {
        const { style } = this.props;
        return <>
            <DictSelect_ {...this.props} />
            <Combobox {...this.props} />
            </>
    }
}
