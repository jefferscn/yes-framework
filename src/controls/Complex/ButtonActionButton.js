import React, { PureComponent } from 'react';
import ActionButton from '../RenderLayer/ActionButton';
import ButtonGroupClick from '../Touchable/ButtonGroupClick';

export default class ButtonActionButton extends PureComponent {
    render() {
        const { style, ...otherProps } = this.props;
        return (
            <ButtonGroupClick {...otherProps}>
                <ActionButton style={style} />
            </ButtonGroupClick>
        )
    }
}
