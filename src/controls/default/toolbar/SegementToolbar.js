import React, { PureComponent } from 'react';
import { OperationWrap as operationWrap, Util, BackHandler, AppDispatcher } from 'yes';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { ActionSheet } from 'antd-mobile';
import { History } from 'yes-platform';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 48,
        backgroundColor: 'white',
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
});
class SegementToolbar extends PureComponent {
    getItems(props) {
        return props.controlState.get('items');
        // return props.controlState.get('items').filter((value) => {
        //     const tag = value.get('tag');
        //     const key = value.get('key');
        //     return tag === 'bpm' || tag === 'loadworkitem' ||  key === 'StartInstance' || key === 'RollBack' || key==='Transit'||key === 'OPTApproveT_DZ';
        // });
    }

    onMoreMenuPressed = (index) => {
        const action = this.state.moreItems[index];
        this.onMenuItemPressed(action);
        this.backHandler && this.backHandler();
    }

    onMenuItemPressed = (caption) => {
        const action = this.state.actions[caption];
        this.el.focus();//以后看看有没有其他处理方案
        if (caption === "更多") {
            setTimeout(() => {
                ActionSheet.showActionSheetWithOptions({
                    options: this.state.moreItems,
                    cancelButtonIndex: this.state.moreItems.length - 1,
                    message: null,
                    maskClosable: true,
                }, this.onMoreMenuPressed);
                History.push(`#ActionSheet`, false);
                this.backHandler = BackHandler.addPreEventListener(() => {
                    ActionSheet.close();
                    this.backHandler();
                    return false;
                });
            }, 0);
        }
        if (action) {
            // Util.waitBlurExec(() => {
            console.log('toolbar pressed');
            Util.safeExec(async () => {
                await Util.waitBlur();
                AppDispatcher.dispatch({
                    type: 'STOPEVENT',
                });
                this.props.onClick(action);
                AppDispatcher.dispatch({
                    type: 'ENABLEEVENT',
                });
            });
            // });
        }
    }

    renderItems() {
        const result = [];
        const length = this.state.mainItems.length;
        this.state.mainItems.forEach((item, index) => {
            result.push(<TouchableOpacity
                ref={(el) => this.el = el}
                style={styles.item}
                onPress={
                    (event) => {
                        console.log(event);
                        this.onMenuItemPressed(item);
                    }
                }>
                <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>);
            if (index < length - 1) {
                result.push(<View style={styles.seperator} />);
            }
        });
        return result;
    }

    calculateItems(props) {
        const items = this.getItems(props);
        const toolbarItems = [];
        const actions = {};
        items.forEach((item) => {
            if (item.get('visible') && item.get('enable')) {
                toolbarItems.push(item.get('caption'));
                actions[item.get('caption')] = item.get('action');
                // toolbarActions.push(item.get('action'));
            }
        });
        let mainItems = null;
        let moreItems = null;
        if (toolbarItems.length > 4) {//当超过4个操作的时候，显示前三个，显示一个更多，点击之后以ActionSheet的方式弹出剩余操作
            mainItems = toolbarItems.slice(0, 3);
            mainItems.push("更多");
            moreItems = toolbarItems.slice(3, toolbarItems.length);
            moreItems.push("取消");
        } else {
            mainItems = toolbarItems;
        }
        this.setState({
            mainItems,
            moreItems,
            actions,
        });
    }

    componentWillReceiveProps(props) {
        this.calculateItems(props);
    }

    componentWillMount() {
        this.calculateItems(this.props);
    }

    render() {
        const length = this.state.mainItems.length;
        if (length === 0) {
            return null;
        }
        return (
            <View style={[styles.container, this.props.containerStyle]}>
                {this.renderItems()}
            </View>
        );
    }
}

const result = operationWrap(SegementToolbar);
result.category='template';
result.key = 'SegementToolbar';

export default result;
