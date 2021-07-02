import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
export default class Element extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
    }
    render() {
        return this.context.createElement(this.props.meta, this.props);
    }
}
