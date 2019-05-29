import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableView } from 'react-native-tableview-simple';
import { Components } from 'yes-platform'; // eslint-disable-line import/no-unresolved
import internationalWrap from '../../controls/InternationalWrap';
import CellLayoutItem from './CellLayoutItem';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

const { ScrollView } = Components;

@observer
class CellLayoutTemplate extends Component {  // eslint-disable-line
    static contextTypes = {
        isDesignMode: PropTypes.func,
        // getControlProps: PropTypes.func,
        // createElement: PropTypes.func,
    }

    addItem = () => {
        console.log('aaa');
    }

    @observable meta = this.props.meta;

    render() {
        return (
            <ScrollView>
                <TableView>
                    <CellLayoutItem meta = {this.meta} />
                </TableView>
            </ScrollView>
        );
    }
}

export default internationalWrap(CellLayoutTemplate);
