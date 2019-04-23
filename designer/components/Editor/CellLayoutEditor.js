import React, { Component } from 'react';
import { ScrollView } from 'yes-platform';
import { observer, inject } from 'mobx-react';
import {
    Cell,
    Section,
    TableView,
} from 'react-native-tableview-simple';

@inject('store')
@observer
export class VisibleEqual extends Component {
    render() {
        const { relateId, value } = this.props;
        if (this.props.store.selectedControl && this.props.store.selectedControl[relateId] == value) {
            return this.props.children;
        }
        return null;
    }
}

@observer
export class CellLayoutEditorCell extends Component {
    render() {
        const { key, caption, type, disabled = false, visibleEqual } = this.props.meta;
        if (typeof type === 'function') {//如果直接是一个类，则直接用于渲染
            const Comp = type;
            if (visibleEqual) {
                return (
                    <VisibleEqual {...visibleEqual}>
                        <Cell
                            title={caption}
                            isDisabled={disabled}
                            cellAccessoryView={<Comp disabled={disabled} meta={this.props.meta} controlId={key} />}
                        />
                    </VisibleEqual>
                )
            }
            return (<Cell
                title={caption}
                isDisabled={disabled}
                cellAccessoryView={<Comp meta={this.props.meta} controlId={key} />}
            />);
        }
        return null;
    }
}
@inject('store')
@observer
class CellLayoutEditor extends Component {
    render() {
        const selectedControl = this.props.store.selectedControl;
        if (!selectedControl) {
            return null;
        }
        if (!selectedControl.constructor.editor) {
            return null;
        }
        return (
            <ScrollView style={{maxWidth: 375, height: 667 }}>
                <TableView>
                    {
                        selectedControl.constructor.editor.map((item) =>
                            <CellLayoutEditorCell meta={item} />
                        )
                    }
                </TableView>
            </ScrollView>
        )
    }
}

export default CellLayoutEditor;
