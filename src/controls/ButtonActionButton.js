import React, { PureComponent } from 'react';
import ActionButton from './ActionButton';
import PropTypes from 'prop-types';
import { ActionSheet } from 'antd-mobile';
import { History } from 'yes-web';
import { BackHandler } from 'yes-intf';

export default class ButtonActionButton extends PureComponent {
    static contextTypes = {
        onControlClick: PropTypes.func,
    }
    onButtonClick = (index)=> {
        const { buttonKey } = this.props;
        const item = buttonKey[index];
        this.backHandler();
        if(item) {
            this.context.onControlClick(item.key);
        }
    }
    controlClick = () => {
        const { buttonKey } = this.props;
        if (Array.isArray(buttonKey)) {
            const items = buttonKey.map(item=>item.text);
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
        const { style } = this.props;
        return (
            <ActionButton onPress={this.controlClick} style={style} />
        )
    }
}
