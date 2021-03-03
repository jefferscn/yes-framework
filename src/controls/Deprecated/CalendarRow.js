import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { GridRowWrap } from 'yes-intf';
import { ListText, VisibleEqual } from 'yes-framework/export';
import IconFont from 'yes-framework/font';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 10,
        margin: 15,
        backgroundColor: '#add8e6',
        padding: 15,
    },
    content: {
        flexDirection: 'column',
        flex: 1,
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionbutton: {
        width: 40,
        textAlign: 'right',
    }
})
class CalendarRow extends PureComponent {
    static contextTypes = {
        getBillForm: PropTypes.func,
        getOwner: PropTypes.func,
        onControlClick: PropTypes.func,
    }
    onClick = () => {
        if (this.props.onClick) {
            this.props.onClick(this.props.rowIndex);
        }
    }
    removeRow = () => {
        this.props.remove && this.props.remove();
    }
    checkRow = async ()=> {
        const grid = this.context.getOwner();
        const billform = this.context.getBillForm();
        if(!grid || !billform) {
            return;
        }
        await grid.unselectAll();
        await grid.toggleSelect(this.props.rowIndex);
        this.context.onControlClick('Submit');
    }
    uncheckRow = async ()=> {
        const grid = this.context.getOwner();
        const billform = this.context.getBillForm();
        if(!grid || !billform) {
            return;
        }
        await grid.unselectAll();
        await grid.toggleSelect(this.props.rowIndex);
        this.context.onControlClick('CancelSubmit');
    }
    render() {
        const { editable, checked } = this.props;
        return (
            <View style={[styles.container]}>
                <TouchableOpacity onPress={this.onClick} style={[styles.content]}>
                    <View style={[styles.content]}>
                        <ListText yigoid="Workdescription" />
                        <ListText yigoid="confirmStatus" />
                    </View>
                </TouchableOpacity>
                <View style={[styles.action]}>
                    {
                        editable ? <IconFont onPress={this.removeRow} size={22} name="icon-icon_roundclose" /> : null
                    }
                    {
                        <VisibleEuqal yigoid="confirmStatus" targetValue="0">
                            <IconFont onPress={this.checkRow} size={22} name="icon-submit" style={[styles.actionbutton]}/>
                        </VisibleEuqal>
                    }
                    {
                        <VisibleEuqal yigoid="confirmStatus" targetValue="1">
                            <IconFont onPress={this.uncheckRow} size={22} name="icon-Canceltherelease" style={[styles.actionbutton]}/>
                        </VisibleEuqal>
                    }
                </View>
            </View>
        )
    }
}

export default GridRowWrap(CalendarRow);
