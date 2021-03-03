import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActionSheet } from 'antd-mobile';
import { History } from 'yes-web';
import { BackHandler } from 'yes-intf';
import VisibleRelated from '../Visible/VisibleRelated';

export default class ButtonGroupClick extends PureComponent {
    static contextTypes = {
        onControlClick: PropTypes.func,
        createElement: PropTypes.func,
    }
    onButtonClick = (index) => {
        const { buttonKey } = this.props;
        const item = buttonKey[index];
        this.backHandler();
        if (item) {
            this.context.onControlClick(item.key);
        }
    }
    controlClick = () => {
        const { buttonKey } = this.props;
        if (Array.isArray(buttonKey)) {
            const items = buttonKey.map(item => item.text);
            items.push('取消');
            ActionSheet.showActionSheetWithOptions({
                options: items,
                cancelButtonIndex: items.length - 1,
                message: null,
                maskClosable: false,
            }, this.onButtonClick);
            History.push(`#ActionSheet`, false);
            this.backHandler = BackHandler.addPreEventListener(() => {
                ActionSheet.close();
                this.backHandler();
                return false;
            });
            return;
        }
        this.context.onControlClick(buttonKey);
    }
    render() {
        const { element, children, buttonKey } = this.props;
        const child = this.context.createElement(element || children);
        if (Array.isArray(buttonKey)) {
            //如果buttonKey是一个数组，则直接渲染
            return React.cloneElement(child, {
                onPress: this.controlClick,
            });
        } else {
            return <VisibleRelated yigoid={buttonKey} >
                {
                    React.cloneElement(child, {
                        onPress: this.controlClick,
                    })
                }
            </VisibleRelated>
        }
    }
}
