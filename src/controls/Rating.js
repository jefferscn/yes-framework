import React, { PureComponent } from 'react';
import { ControlWrap } from 'yes-intf';
import { StyleSheet } from 'react-native';
import Rating from 'react-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

class YIGORating extends PureComponent {
    static contextTypes={
        createElement: PropTypes.func,
    }
    static defaultProps = {
        start: 0,
        end: 5,
        step: 1,
        fractions: 1,
    }
    render() {
        const { value, disabled, onChange, start, step, end, fractions,emptySymbol, fullSymbol, textStyles } = this.props;
        const emptySymbolEle = emptySymbol? this.context.createElement(emptySymbol) : <Icon name="star-o" size={20} />
        const fullSymbolEle = fullSymbol? this.context.createElement(fullSymbol) : <Icon name="star" size={20} color="red"/>
        return <Rating 
            style={StyleSheet.flatten(textStyles)}
            initialRating={value}
            start={start}
            stop={end}
            step={step}
            readonly={disabled}
            emptySymbol={emptySymbolEle}
            fullSymbol={fullSymbolEle}
            fractions={fractions}
            onChange={onChange}
        />
    }
}

export default ControlWrap(YIGORating);
