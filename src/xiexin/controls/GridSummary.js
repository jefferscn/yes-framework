import React, { PureComponent } from 'react';
import { GridWrap } from 'yes-intf';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Decimal from 'decimal.js';

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingLeft: 8,
        paddingRight: 8,
    },
    colorText: {
        color: '#FB6530',
    }
});
@GridWrap
export default class GridSummary extends PureComponent {
    static contextTypes = {
        getOwner: PropTypes.func,
    }
    getRowCount = ()=> {
        return this.props.data? this.props.data.size : 0;
    }
    getTotal = ()=> {
        const { sumField } = this.props;
        const owner = this.context.getOwner();
        if(!owner) {
            return 0;
        }
        const index = owner.getCellIndexByKey(sumField);
        let total = new Decimal(0);
        for(let i=0;i<this.props.data.size;i++) {
            let v = owner.getValueAt(i, index);
            total = total.plus(v);
        }
        return parseFloat(total);
    }
    render() {
        const { style, textStyle, text } = this.props;
        return (
            <View style={[styles.main, style]}>
                <Text style={[styles.colorText, textStyle]}>{this.getRowCount()}张</Text>
                <Text>{text}</Text>
                <Text style={[styles.colorText, textStyle]}>{this.getTotal()}元</Text>
            </View> 
        )
    }
}