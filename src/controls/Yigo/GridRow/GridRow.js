import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { GridRowWrap } from 'yes-intf';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    headLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headRight: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    footLeft: {
        flexDirection: 'row',
    },
    footRight: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    content: {
        paddingLeft: 12,
        paddingRight: 12,
    },
    header: {
        height: 30,
        paddingLeft: 12,
        paddingRight: 12,
        flexDirection: 'row',
    },
    footer: {
        height: 43,
        paddingLeft: 12,
        paddingRight: 12,
        alignItems: 'center',
        flexDirection: 'row',
    },
    seperator: {
        height: 1,
        backgroundColor: '#DEDEDE'
    },
});

@GridRowWrap
export default class GridRow extends PureComponent {
    static defaultProps = {
        showSeperator: false
    }
    static contextTypes = {
        createElement: PropTypes.func,
    }
    render() {
        const { headLeft, headRight, footLeft, actions, footRight, showSeperator, seperatorStyle,
            content, style, headStyle, contentStyle, footStyle } = this.props;
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={[styles.container, style]}>
                    {
                        (headLeft || headRight) ? <View style={[styles.header, headStyle]}>
                            <View style={styles.headLeft}>
                                {
                                    headLeft ? headLeft.map((item) => this.context.createElement(item)) : null
                                }
                            </View>
                            <View style={styles.headRight}>
                                {
                                    headRight ? headRight.map((item) => this.context.createElement(item)) : null
                                }
                            </View>
                        </View> : null
                    }
                    <View style={[styles.content, contentStyle]}>
                        {
                            this.context.createElement(content)
                        }
                    </View>
                    {
                        (footLeft || footRight) ? <View style={[styles.footer, footStyle]}>
                            <View style={styles.footLeft}>
                                {
                                    footLeft ? footLeft.map((item) => this.context.createElement(item)) : null
                                }
                            </View>
                            <View style={styles.footRight}>
                                {
                                    footRight ? footRight.map((item) => this.context.createElement(item)) : null
                                }
                            </View>
                        </View> : null
                    }
                    {
                        showSeperator ? <View style={[styles.seperator, seperatorStyle]} /> : null
                    }
                </View>
            </TouchableOpacity>
        )
    }
}
