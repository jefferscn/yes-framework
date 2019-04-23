import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Components } from 'yes-platform';
import { observer } from 'mobx-react';
import { DynamicControl, controlVisibleWrapper, notEmptyVisibleWrapper, equalVisibleWrapper } from 'yes'; // eslint-disable-line import/no-unresolved
import internationalWrap from '../../controls/InternationalWrap';
import { observable } from 'mobx';
import designWrap from '../DesignWrap';

const { Layout } = Components;
const { CellLayout } = Layout;

const RelatedCell = controlVisibleWrapper(DynamicControl);
const NotEmptyRelatedCell = notEmptyVisibleWrapper(DynamicControl);
const EqualCell = equalVisibleWrapper(DynamicControl);

const styles = {
    textStyle: {
        color: 'gray',
        wordWrap: 'break-word',
        whiteSpace: 'pre-wrap',
        justifyContent: 'flex-end',
        display: 'flex',
    },
    contentStyle: {
        maxWidth: 110,
        textAlign: 'right',
    },
    textContainerStyle: {
        flexBasis: 0,
    },
    accessoryStyle: {
        paddingLeft: 15,
    },
};

@internationalWrap
@observer
export default class CellLayoutItem extends Component {
    static contextTypes = {
        getControlProps: PropTypes.func,
        createElement: PropTypes.func,
    }
    static defaultProps = {
        designMode: false,
    }

    getLayout(item, contentStyle) {
        if (!item.layoutType || item.layoutType === 'cell') {
            return <CellLayout contentStyle={[styles.contentStyle, contentStyle]} titleStyle={styles.textStyle} divider title={item.caption ? this.props.formatMessage(item.caption) : ''} style={styles.accessoryStyle} />;
        }
        if (!item.layoutType || item.layoutType === 'control') {
            return null;
        }
        return null;
    }
    render() {
        const item = this.props.meta;
        let S = DynamicControl;
        const extraProps = {};
        if (this.props.designMode) {
            S = designWrap(S);
            extraProps.visible = true;
        } else {
            if (item.visibleNotEmpty) {
                S = NotEmptyRelatedCell;
                extraProps.relatedId = item.visibleNotEmpty;
            }
            if (item.visibleRelation) {
                S = RelatedCell;
                extraProps.relatedId = item.visibleRelation;
            }
            if (item.visibleEqual) {
                S = EqualCell;
                extraProps.relatedId = item.visibleEqual.yigoid;
                extraProps.value = item.visibleEqual.value;
            }
        }
        if (item.type === 'element') {
            return this.context.createElement(item);
        }
        return (<S
            {...extraProps}
            meta={item}
            key={item.key || item}
            yigoid={item.key || item}
            isCustomLayout
            contentContainerStyle={{ justifyContent: 'flex-end', alignItems: 'center', textAlign: 'right' }}
            showLabel={false}
            // hideWhenEmptyValue
            textStyles={{ textAlign: 'left' }}
            layoutStyles={{ minHeight: 44, textAlign: 'left', justifyContent: 'flex-start', alignItems: 'center' }}
            layout={this.getLayout(item)}
            {...this.context.getControlProps(item.key || item)}
        />);

    }
}