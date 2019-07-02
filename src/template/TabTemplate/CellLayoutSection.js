import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Section } from 'react-native-tableview-simple';
import { controlVisibleWrapper, notEmptyVisibleWrapper, equalVisibleWrapper } from 'yes'; // eslint-disable-line import/no-unresolved
import internationalWrap from '../../controls/InternationalWrap';
import CellLayoutItem from './CellLayoutItem';
import AwesomeFontIcon from 'react-native-vector-icons/FontAwesome';
// import designWrap from '../DesignWrap';
import { observable } from 'mobx';
import YigoControl from '../YigoControl';
import Element from '../Element';

const RelatedSection = controlVisibleWrapper(Section);
const NotEmptyRelatedSection = notEmptyVisibleWrapper(Section);
const EqualSection = equalVisibleWrapper(Section);
const styles = StyleSheet.create({
    design: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

@internationalWrap
@observer
export default class CellLayoutSection extends Component {
    static contextTypes = {
        getControlProps: PropTypes.func,
        createElement: PropTypes.func,
        isDesignMode: PropTypes.func,
    }

    @observable meta = this.props.meta
    addItem = () => {
        this.meta.items.push({
            isGroup: false,
            type: 'yigo',
            layoutType: 'cell',
            hideTitle: false,
            caption: '',
            visibleNotEmpty: '',
            visibleRelation: '',
            visibleEqual: {
                yigoid: '',
                value: null,
            },
            items: [],
            yigoControl: YigoControl.defaultValue,
            elementControl: Element.defaultValue
        })
    }

    render() {
        // const { meta: section } = this.props;
        const section = this.meta;
        const designMode = this.context.isDesignMode && this.context.isDesignMode();
        let designNode = null;
        if (designMode) {
            designNode = (
                <TouchableOpacity onPress={this.addItem} >
                    <View style={styles.design}>
                        <AwesomeFontIcon name="plus" />
                    </View>
                </TouchableOpacity>
            )
        }
        let S = Section;
        const extraProps = {};
        if (section.visibleNotEmpty) {
            S = NotEmptyRelatedSection;
            extraProps.relatedId = section.visibleNotEmpty;
        }
        if (section.visibleRelation) {
            S = RelatedSection;
            extraProps.relatedId = section.visibleRelation;
        }
        if (section.visibleEqual && section.visibleEqual.yigoid) {
            S = EqualSection;
            extraProps.relatedId = section.visibleEqual.yigoid;
            extraProps.value = section.visibleEqual.value;
        }

        return (
            <S {...extraProps}
                meta={section}
                sectionPaddingTop={10}
                sectionPaddingBottom={0}
                header={section.hideTitle ? false : this.props.formatMessage(section.caption)}
                hideSeparator>
                {
                    section.items.map((item) => {
                        return (
                            <CellLayoutItem designPositionBase meta={item} />
                        )
                    })
                }
                {
                    designNode
                }
            </S>
        );
    }
}