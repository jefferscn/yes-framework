import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Components } from 'yes-platform';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { internationalWrap, DynamicControl, controlVisibleWrapper, notEmptyVisibleWrapper, equalVisibleWrapper } from 'yes'; // eslint-disable-line import/no-unresolved
import YigoControl from 'yes-designer/components/Framework/YigoControl';
import Element from 'yes-designer/components/Framework/Element';

const { Layout } = Components;
const { CellLayout } = Layout;

const RelatedCell = controlVisibleWrapper(YigoControl);
const NotEmptyRelatedCell = notEmptyVisibleWrapper(YigoControl);
const EqualCell = equalVisibleWrapper(YigoControl);

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
        // getControlProps: PropTypes.func,
        createElement: PropTypes.func,
    }
   
    @observable meta = this.props.meta

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
        const item = this.meta;
        let S = YigoControl;
        const extraProps = {};
        if (this.props.designMode) {
            // S = designWrap(S);
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
            if (item.visibleEqual && item.visibleEqual.yigoid) {
                S = EqualCell;
                extraProps.relatedId = item.visibleEqual.yigoid;
                extraProps.value = item.visibleEqual.value;
            }
        }
        if (item.type === 'element') {
            return <Element meta = {item.elementControl} />;
            // return this.context.createElement(item);
        }
        return (<S
            {...extraProps}
            meta={item.yigoControl}
            // key={item.key || item}
            // yigoid={item.key || item}
            isCustomLayout
            contentContainerStyle={{ justifyContent: 'flex-end', alignItems: 'center', textAlign: 'right' }}
            showLabel={false}
            // hideWhenEmptyValue
            textStyles={{ textAlign: 'left' }}
            layoutStyles={{ minHeight: 44, textAlign: 'left', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white' }}
            layout={this.getLayout(item)}
        />);

    }
}