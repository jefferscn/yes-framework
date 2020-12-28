import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
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
        fontSize: 12,
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
        flexBasis: 'auto',
        justifyContent: 'center',
    },
    defaultLayout: {
        minHeight: 30,
        textAlign: 'left',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    defaultText: {
        textAlign: 'left',
    },
    labelRight: {
        textAlign: 'right',
        justifyContent: 'flex-end',
    },
    labelLeft: {
        textAlign: 'left',
        justifyContent: 'flex-start',
    },
    labelMiddle: {
        textAlign: 'center',
        justifyContent: 'center',
    },
    labelVAlignTop: {
        alignItems: 'flex-start',
    },
    labelVAlignMiddle: {
        alignItems: 'center',
    },
    labelVAlignBottom: {
        alignItems: 'flex-end',
    }
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
        labelAlign: PropTypes.oneOf(['left', 'right', 'middle']),
        labelVAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
        contentAlign: PropTypes.oneOf(['left', 'right', 'middle']),
    };

    static contextTypes = {
        getControlProps: PropTypes.func,
        createElement: PropTypes.func,
    }

    static defaultProps = {
        labelAlign: 'left',
        contentAlign: 'right',
        labelVAlign: 'middle',
    }

    getControlProps = (key) => {
        if (this.context.getControlProps) {
            return this.context.getControlProps(key);
        }
        return {};
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
                renderHeader={() => this.props.formatMessage(section.caption)} hideSeparator>
                {
                    section.items.map((item) => {
                        if (item.type === 'element') {
                            return this.context.createElement(item, {
                                layout: this.getLayout(item),
                                // contentContainerStyle: { justifyContent: 'flex-end', alignItems: 'center', textAlign: 'right' },
                                textStyles: this.getContentTextStyle(item),
                                layoutStyles: this.getContentLayoutStyle(item),
                            });
                        }
                        return (
                            <DynamicControl
                                key={item.key || item}
                                yigoid={item.key || item}
                                isCustomLayout
                                showLabel={false}
                                // disabled={true}
                                // contentContainerStyle={{ justifyContent: 'flex-end', alignItems: 'center', textAlign: 'right' }}
                                // hideWhenEmptyValue
                                textStyles={this.getContentTextStyle(item)}
                                layoutStyles={this.getContentLayoutStyle(item)}
                                layout={this.getLayout(item, section.contentStyle)}
                                {...this.getControlProps(item.key || item)}
                            />
                        )
                    })
                }
            </S>
        );
    }

    getLabelStyle = () => {
        const { labelAlign, labelVAlign, titleStyle } = this.props;
        return [styles.textStyle, 
                labelAlign === 'left' ? styles.labelLeft : (labelAlign === 'middle' ? styles.labelMiddle : styles.labelRight), 
                labelVAlign ==='top' ? styles.labelVAlignTop : (labelVAlign==='middle' ? styles.labelVAlignMiddle : styles.labelVAlignBottom),
                titleStyle];
    }

    getContentTextStyle = (item) => {
        const { contentAlign, contentTextStyle } = this.props;
        return [contentAlign === 'left' ? styles.labelLeft : (contentAlign === 'middle' ? styles.labelMiddle : styles.labelRight),
            contentTextStyle, item.textStyle];
    }

    getContentLayoutStyle = (item) => {
        const { contentAlign, contentLayoutStyle } = this.props;
        return [contentAlign === 'left' ? styles.labelLeft : (contentAlign === 'middle' ? styles.labelMiddle : styles.labelRight),
            contentLayoutStyle, item.layoutStyle];
    }

    getLayout(item, contentStyle) {
        const { titleStyle } = this.props;
        if (this.props.getLayout) {
            return this.props.getLayout(item);
        }
        if (!item.layoutType || item.layoutType === 'cell') {
            return <CellLayout
                contentStyle={[styles.contentStyle, contentStyle]}
                titleStyle={[this.getLabelStyle(), item.labelStyle]}
                divider title={item.caption ? this.props.formatMessage(item.caption) : ''}
                style={styles.accessoryStyle}
            />;
        }
        if (!item.layoutType || item.layoutType === 'control') {
            return null;
        }
        return null;
    }

    renderItem = (item) => {
        const { layoutStyle, textStyle } = this.props;
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
        if (item.type === 'element') {
            return this.context.createElement(item, {
                layout: this.getLayout(item),
                // contentContainerStyle: { justifyContent: 'flex-end', alignItems: 'center', textAlign: 'right' },
                textStyles: this.getContentTextStyle(item),
                layoutStyles: this.getContentLayoutStyle(item),
            });
        }
        if (typeof item === 'object') {
            Object.assign(extraProps, item);
        }
        return (<S
            key={item.key || item}
            yigoid={item.key || item}
            isCustomLayout
            // disabled={true}
            // contentContainerStyle={{ justifyContent: 'flex-end', alignItems: 'center', textAlign: 'right' }}
            showLabel={false}
            // hideWhenEmptyValue
            textStyles={this.getContentTextStyle(item)}
            layoutStyles={this.getContentLayoutStyle(item)}
            layout={this.getLayout(item)}
            {...extraProps}
            {...this.getControlProps(item.key || item)}
        />);
    }

    render() {
        const { style } = this.props;
        if (this.props.isGrid) {
            return (<View style={{ flex: 1 }}>
                <DynamicControl
                    key={this.props.grid}
                    yigoid={this.props.grid}
                    isCustomLayout
                    {...this.getControlProps(this.props.grid)}>
                </DynamicControl>
            </View>);
        }
        return (
            // <ScrollView>
            <List style={StyleSheet.flatten(style)}>
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
            // </ScrollView>
        );
    }
}

export default internationalWrap(CellLayoutTemplate);
