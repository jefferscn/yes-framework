import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
// import { TableView, Section } from 'react-native-tableview-simple';
import { List } from 'antd-mobile';
import { Components } from 'yes-comp-react-native-web'; // eslint-disable-line import/no-unresolved
import { DynamicControl, controlVisibleWrapper, notEmptyVisibleWrapper, equalVisibleWrapper, internationalWrap } from 'yes'; // eslint-disable-line import/no-unresolved
// import internationalWrap from '../../controls/InternationalWrap';

const { ScrollView, Layout } = Components;
const { CellLayout } = Layout;
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

const RelatedSection = controlVisibleWrapper(List);
const NotEmptyRelatedSection = notEmptyVisibleWrapper(List);
const EqualSection = equalVisibleWrapper(List);
const RelatedCell = controlVisibleWrapper(DynamicControl);
const NotEmptyRelatedCell = notEmptyVisibleWrapper(DynamicControl);
const EqualCell = equalVisibleWrapper(DynamicControl);
class CellLayoutTemplate extends Component {  // eslint-disable-line
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            tagName: PropTypes.string,
            key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            caption: PropTypes.string,
        })),
    };

    static contextTypes = {
        getControlProps: PropTypes.func,
        createElement: PropTypes.func,
    }

    renderSection(section) {
        let S = List;
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
            <S {...extraProps} 
                renderHeader={()=>this.props.formatMessage(section.caption)} hideSeparator>
                {
                    section.items.map((item) => {
                        if (item.type === 'element') {
                            return this.context.createElement(item);
                        }
                        return (
                            <DynamicControl
                                key={item.key || item}
                                yigoid={item.key || item}
                                isCustomLayout
                                showLabel={false}
                                contentContainerStyle={{ justifyContent: 'flex-end', alignItems: 'center', textAlign: 'right' }}
                                // hideWhenEmptyValue
                                textStyles={{ textAlign: 'left' }}
                                layoutStyles={{ minHeight: 44, textAlign: 'left', justifyContent: 'flex-start', alignItems: 'center' }}
                                layout={this.getLayout(item, section.contentStyle)}
                                {...this.context.getControlProps(item.key || item)}
                            />
                        )
                    })
                }
            </S>
        );
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

    renderItem = (item) => {
        let S = DynamicControl;
        const extraProps = {};
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
        return (<S
            {...extraProps}
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

    render() {
        if (this.props.isGrid) {
            return (<View style={{ flex: 1 }}>
                <DynamicControl
                    key={this.props.grid}
                    yigoid={this.props.grid}
                    isCustomLayout
                    {...this.context.getControlProps(this.props.grid)}>
                </DynamicControl>
            </View>);
        }
        return (
            <ScrollView>
                <List>
                    {
                        this.props.items.map((section) =>
                            (
                                section.isGroup ? this.renderSection(section) :
                                    section.items ?
                                        section.items.map((item) => {
                                            return this.renderItem(item);
                                        }
                                        ) : this.renderItem(section)
                            )
                        )
                    }
                </List>
            </ScrollView>
        );
    }
}

export default internationalWrap(CellLayoutTemplate);
