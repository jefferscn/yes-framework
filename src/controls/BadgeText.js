import React, { PureComponent } from 'react';
import { Badge } from 'antd-mobile';
import { ControlWrap } from 'yes-intf';

@ControlWrap
class BadgeText extends PureComponent {
    render() {
        const { displayValue } = this.props;
        return <Badge text={displayValue} overflowCount={99} />
    }
}

export default BadgeText
