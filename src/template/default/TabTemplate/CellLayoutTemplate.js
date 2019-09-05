import React, { Component } from 'react';
import { TableView } from 'react-native-tableview-simple';
import { Components } from 'yes-platform'; // eslint-disable-line import/no-unresolved
import CellLayoutItem from './CellLayoutItem';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

const { ScrollView } = Components;

@observer
class CellLayoutTemplate extends Component {  // eslint-disable-line
    @observable meta = this.props.meta;

    render() {
        return (
            <ScrollView>
                <TableView>
                    <CellLayoutItem designPositionBase meta = {this.meta} />
                </TableView>
            </ScrollView>
        );
    }
}

export default CellLayoutTemplate;
