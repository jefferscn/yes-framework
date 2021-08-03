import React, { PureComponent } from 'react';
import { OperationWrap as operationWrap } from 'yes';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import GridTotal from '../../../hoc/GridTotal';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { Util } from 'yes-intf';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 48,
        backgroundColor: 'aliceblue',
        paddingLeft: 12,
        paddingRight: 12,
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#008CD7',
        fontSize: 16,
    },
    seperator: {
        width: 1,
        borderColor: '#DCDCDC',
        borderWidth: 1,
        borderStyle: 'solid',
        marginTop: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        width: 100,
        justifyContent: 'center',
    },
    count: {
        flex: 1,
        justifyContent: 'center',
    },
    selectAll: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        color: '#008CD7',
        fontSize: 30,
    },
});

@GridTotal
class GridBatchOperate extends PureComponent {
    static defaultProps = {
        autoHide: false,
        optType: 'toolbar',
        supportSelectAll: false,
    }

    static contextTypes = {
        onControlClick: PropTypes.func,
        getOwner: PropTypes.func,
    }

    getItem(props) {
        const totalItems = props.controlState.get('items');
        return totalItems.find((value) => {
            const key = value.get('key');
            return key === this.props.optKey;
        });
    }

    doOpt = async () => {
        if (this.props.optType === 'toolbar') {
            const item = this.getItem(this.props);
            if (item) {
                Util.safeExec(async () =>
                    await this.props.onClick(item.get('action'))
                )
            }
        }
        if (this.props.optType === 'button') {
            Util.safeExec(async () =>
                await this.context.onControlClick(this.props.optKey)
            );
        }
    }

    toggleSelectAll = () => {
        const owner = this.context.getOwner();
        if (!owner) {
            return;
        }
        const { selectedCount, title, autoHide, count, supportSelectAll } = this.props;
        if (selectedCount === count) {
            owner.unselectAll();
        } else {
            owner.selectAll();
        }
    }

    render() {
        const { selectedCount, title, autoHide, count, supportSelectAll, selectAllStyle } = this.props;
        if (!selectedCount && autoHide) {
            return null;
        }
        let selectAllComp = null;
        if (supportSelectAll) {
            let icon = null;
            if (selectedCount === 0) {
                icon = <Icon style={[styles.icon, selectAllStyle]} name="circle-o" />;
            } else {
                if (selectedCount === count) {
                    icon = <Icon style={[styles.icon, selectAllStyle]} name="check-circle-o" />;

                } else {
                    icon = <Icon style={[styles.icon, selectAllStyle]} name="dot-circle-o" />
                }
            }
            selectAllComp = <TouchableOpacity style={styles.selectAll} onPress={this.toggleSelectAll} >
                {
                    icon
                }
            </TouchableOpacity>
        }
        return (
            <View style={[styles.container, this.props.containerStyle]}>
                {
                    selectAllComp
                }
                <View style={styles.count}>
                    <Text style={styles.text}>{`选中${selectedCount}/${count}行`}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button disabled={selectedCount == 0} onPress={this.doOpt} title={title} />
                </View>
            </View>
        );
    }
}

export default operationWrap(GridBatchOperate);
