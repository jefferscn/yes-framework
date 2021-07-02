import React, { PureComponent } from 'react';
import OpenFormClick from '../Touchable/OpenFormClick';
import ActionButton from '../RenderLayer/ActionButton';

export default class OpenFormActionButton extends PureComponent {
    render() {
        const { style, ...otherProps } = this.props;
        return <OpenFormClick {...otherProps}>
            <ActionButton style={style} />
        </OpenFormClick>
    }
}
