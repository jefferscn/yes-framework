import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Components } from 'yes-platform';
import { Section } from 'react-native-tableview-simple';
import { DynamicControl, controlVisibleWrapper, notEmptyVisibleWrapper, equalVisibleWrapper } from 'yes'; // eslint-disable-line import/no-unresolved
import internationalWrap from '../../controls/InternationalWrap';
import CellLayoutItem from './CellLayoutItem';
import designWrap from '../DesignWrap';

const { Layout } = Components;
const { CellLayout } = Layout;
const RelatedSection = controlVisibleWrapper(Section);
const NotEmptyRelatedSection = notEmptyVisibleWrapper(Section);
const EqualSection = equalVisibleWrapper(Section);
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
export default class CellLayoutSection extends Component {
    static contextTypes = {
        getControlProps: PropTypes.func,
        createElement: PropTypes.func,
    }

    static defaultProps = {
        designMode: false,
    }

    // getLayout(item, contentStyle) {
    //     if (!item.layoutType || item.layoutType === 'cell') {
    //         return <CellLayout contentStyle={[styles.contentStyle, contentStyle]} titleStyle={styles.textStyle} divider title={item.caption ? this.props.formatMessage(item.caption) : ''} style={styles.accessoryStyle} />;
    //     }
    //     if (!item.layoutType || item.layoutType === 'control') {
    //         return null;
    //     }
    //     return null;
    // }

    render() {
        const { meta : section, hideTitle } = this.props;
        let S = Section;
        if(this.props.designMode) {
            S = designWrap(S);
        }
        const extraProps = {};
        if (section.visibleNotEmpty) {
            S = NotEmptyRelatedSection;
            extraProps.relatedId = section.visibleNotEmpty;
        }
        if (section.visibleRelation) {
            S = RelatedSection;
            extraProps.relatedId = section.visibleRelation;
        }
        if (section.visibleEqual) {
            S = EqualSection;
            extraProps.relatedId = section.visibleEqual.yigoid;
            extraProps.value = section.visibleEqual.value;
        }

        return (
            <S {...extraProps} meta = {section} sectionPaddingTop={10} sectionPaddingBottom={0} header={hideTitle?false:this.props.formatMessage(section.caption)} hideSeparator>
                {
                    section.items.map((item) => {
                        // if (item.type === 'element') {
                        //     return this.context.createElement(item);
                        // }
                        return (
                            <CellLayoutItem designMode = {this.props.designMode} meta={ item } />
                        )
                        // return (
                        //     <DynamicControl
                        //         key={item.key || item}
                        //         yigoid={item.key || item}
                        //         isCustomLayout
                        //         showLabel={false}
                        //         contentContainerStyle={{ justifyContent: 'flex-end', alignItems: 'center', textAlign: 'right' }}
                        //         textStyles={{ textAlign: 'left' }}
                        //         layoutStyles={{ minHeight: 44, textAlign: 'left', justifyContent: 'flex-start', alignItems: 'center' }}
                        //         layout={this.getLayout(item, section.contentStyle)}
                        //         {...this.context.getControlProps(item.key || item)}
                        //     />
                        // )
                    })
                }
            </S>
        );
    }
}