import React, { PureComponent } from 'react';
import { intlShape } from 'react-intl';

export default (BaseClass) => {
    return class InternationSupportClass extends PureComponent {
        static contextTypes = {
            intl: intlShape,
        }
        formatMessage = (msg) => {
            if (msg) {
                return this.context.intl ? this.context.intl.formatMessage({ id: msg }) : msg;
            }
            return msg;
        }
        render() {
            return (<BaseClass
                formatMessage={this.formatMessage}
                {...this.props}
            />);
        }
    };
};
