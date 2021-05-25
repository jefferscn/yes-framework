# 操作高阶函数
    对应PC版单据的展现就是单据的Toolbar上面的按钮，这个高阶函数向渲染控件提供单据的所有操作数据
## 使用方法
```javascript
import React, { PureComponent } from 'react';
import { OperationWrap as operationWrap, Util, BackHandler, AppDispatcher } from 'yes';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { ActionSheet } from 'antd-mobile';
import { History } from 'yes-platform';
import internationalWrap from './InternationalWrap';

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
        // return props.controlState.get('items');
        return props.controlState.get('items').filter((value) => {
            const tag = value.get('tag');
            const key = value.get('key');
            return tag === 'bpm' || tag === 'loadworkitem' ||  key === 'StartInstance' || key === 'RollBack' || key==='Transit'||key === 'OPTApproveT_DZ';
        });
    }

    onMoreMenuPressed = (index) => {
        const action = this.state.moreItems[index];
        this.onMenuItemPressed(action);
        this.backHandler && this.backHandler();
    }

    onMenuItemPressed = (caption) => {
        const action = this.state.actions[caption];
        this.el.focus();//以后看看有没有其他处理方案
        if (caption === this.props.formatMessage('More')) {
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
        if (items.size > 4) {//当超过4个操作的时候，显示前三个，显示一个更多，点击之后以ActionSheet的方式弹出剩余操作
            mainItems = toolbarItems.slice(0, 3);
            mainItems.push(this.props.formatMessage('More'));
            moreItems = toolbarItems.slice(3, toolbarItems.length);
            moreItems.push(this.props.formatMessage('Cancel'));
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

export default operationWrap(internationalWrap(SegementToolbar));
```
上面这个使用的例子就是提供了一个以文本方式显示的操作条的实现，当操作数量超过3个的时候将会显示一个更多的按钮，弹出ActionSheet来显示其他操作。

## 接口
```javascript
render() {
    if (this.state.state) {
        return <BaseComponent
            controlState={this.state.state}
            onClick={this.onOperationClick}
            {...this.props}
        >
        </BaseComponent>
    } else {
        return null;
    }
}
```
* onClick

* controlState

    这个就是toolbar的状态对象，其中包含了一个items属性，是个数组，其中的每个项目就是一个操作，每个操作都包含tag,visible,enable,caption,action这几个属性，最后的action就是需要在点击的时候传递给onClick函数的参数

## 数据项目描述
```javascript
items = Immutable.fromJS([
    {
        tag:'bpm',
        caption: '同意',
        enable: true,
        visible: true,
        action: 'xxxxxxxxxxxx'
    },
    {
        tag:'bpm',
        caption: '拒绝',
        enable: true,
        visible: true,
        action: 'xxxxxxxxxxxx'
    },
    ...
])
```