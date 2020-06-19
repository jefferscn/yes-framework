import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ButtonActionButton extends PureComponent {
    static contextTypes = {
        onControlClick: PropTypes.func,
    }
    componentDidMount() {
        this.context.onControlClick(this.props.yigoid);
    }
    render() {
        return null;
    }
}
