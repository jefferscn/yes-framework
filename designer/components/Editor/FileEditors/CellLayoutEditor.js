import React, { Component } from 'react';
import { ScrollView } from 'yes-platform';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import {
    Cell,
    Section,
    TableView,
} from 'react-native-tableview-simple';

@observer
export class VisibleEqual extends Component {
    render() {
        const { relateId, value, data } = this.props;
        if (data && data[relateId] == value) {
            return this.props.children;
        }
        return null;
    }
}

@observer
export class CellLayoutEditorCell extends Component {
    onChange = (v)=>{
        this.props.data[this.props.meta.key] = v;
    }
    render() {
        const { key, caption, type, disabled = false, visibleEqual } = this.props.meta;
        const { data, meta, value } = this.props;
        if (typeof type === 'function') {//如果直接是一个类，则直接用于渲染
            const Comp = type;
            if (visibleEqual) {
                return (
                    <VisibleEqual data={data} {...visibleEqual}>
                        <Cell
                            title={caption}
                            isDisabled={disabled}
                            cellAccessoryView={<Comp onChange={this.onChange} disabled={disabled} meta={this.props.meta} value={value} />}
                        />
                    </VisibleEqual>
                )
            }
            return (<Cell
                title={caption}
                isDisabled={disabled}
                cellAccessoryView={<Comp onChange={this.onChange} meta={meta} value={value} />}
            />);
        }
        return null;
    }
}

@observer
class CellLayoutEditor extends Component {
    @observable data = this.props.data;
    render() {
        const { meta } = this.props;
        return (
            <ScrollView style={{maxHeight: 667 }}>
                <TableView>
                    {
                        meta.map((item) =>
                            <CellLayoutEditorCell data= {this.data} onChange={this.onChange} value= {this.data[item.key]} meta={item} />
                        )
                    }
                </TableView>
            </ScrollView>
        )
    }
}

export default CellLayoutEditor;
