import React, { PureComponent } from 'react';
import {
    View, StyleSheet, Text, ImageBackground, Animated,
    ScrollView, TouchableWithoutFeedback
} from 'react-native';
import { ControlWrap } from 'yes-intf';
import ListText from 'yes-framework/controls/ListText';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexBasis: 0,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
    },
    page: {
        flex: 1,
        backgroundColor: '#F7F6F9',
    },
    card: {
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 13,
        marginRight: 13,
        marginBottom: 6,
        overflow: 'visible',
        boxShadow: '0 3px 3px #888888',
        backgroundColor: 'white',
        flexBasis: 'auto',
    },
    firstCard: {
        paddingTop: 30,
        paddingLeft: 14,
        paddingRight: 14,
        paddingBottom: 30,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    cardBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    lightText: {
        color: 'white',
    },
    bigMoney: {
        textAlign: 'right',
        fontSize: 30,
        lineHeight: 30,
    },
    moneyLabel: {
        // flex: 1,
        width: 100,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        display: 'flex',
    },
    font12: {
        fontSize: 12,
    },
    font30: {
        fontSize: 30,
        lineHeight: 30,
    },
    fontAlignRight: {
        textAlign: 'right',
    },
    icon: {
        width: 20,
        textAlign: 'right',
    },
    bookmark: {
        position: 'absolute',
        right: -4,
        height: 30,
        top: 30,
        width: 120,
        backgroundImage: 'linear-gradient(to right, rgba(233, 243, 171,0.5), rgba(252, 210, 37,0.5))',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    bookmarkText: {
        color: '#CA9300',
    },
    bookmarkCornor: {
        position: 'absolute',
        top: -4,
        right: 0,
        border: '2px solid #CCA34D',
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
    },
    cardHead: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 16,
        paddingLeft: 12,
        paddingBottom: 8,
        paddingRight: 12,
    },
    cardTitle: {
        paddingLeft: 8,
        fontWeight: 'bold',
        fontSize: 16,
    },
    cardTitleExtra: {
        flex: 1,
        textAlign: 'right',
        color: '#999999',
        paddingRight: 8,
        paddingleft: 8,
    },
    cardline: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    currency: {
        fontSize: 14,
        color: 'white',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flex: 1,
        display: 'flex',
    },
    currentMain: {
        flex: 1,
        paddingRight: 0,
    }
});

class CardHeader extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
    }
    buildIcon = () => {
        const { icon, iconStyle } = this.props;
        if (!icon) {
            return null;
        }
        if (typeof icon === 'string') {
            return <Icon name={icon} style={iconStyle} />;
        }
        return this.context.createElement(icon);
    }
    buildTitle = () => {
        const { title, titleStyle } = this.props;
        if (!title) {
            return null;
        }
        if (typeof title === 'string') {
            return <Text style={styles.cardTitle}>{title}</Text>
        }
        return this.context.createElement(title);
    }
    buildExtra = () => {
        const { extra } = this.props;
        if (!extra) {
            return <View style={{ flex: 1 }} />;
        }
        return this.context.createElement(extra);
    }
    onPress = () => {
        const { expanded } = this.props;
        if (expanded) {
            this.props.collapse && this.props.collapse();
            return;
        }
        this.props.expand && this.props.expand();
    }
    buildCollapse = () => {
        const { collapseable, expanded } = this.props;
        if (!collapseable) {
            return null;
        }
        return (
            <TouchableWithoutFeedback onPress={this.onPress}>
                <Icon style={styles.icon} name={expanded ? "angle-up" : "angle-down"} size={20} color="#999999" />
            </TouchableWithoutFeedback>
        );

    }
    render() {
        const { icon, title, extra, collapseable, style } = this.props;
        return (<View style={[styles.cardHead, style]}>
            {
                this.buildIcon()
            }
            {
                this.buildTitle()
            }
            {
                this.buildExtra()
            }
            {
                this.buildCollapse()
            }
        </View>);
    }
}

@ControlWrap
export default class Card extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
    }
    state = {
        expanded: this.props.collapseable ? this.props.expanded : true,
        animation: new Animated.Value(),
    }
    collapse = () => {
        this.setState({
            expanded: false,
        });
        const { animation, height } = this.state;
        animation.setValue(height)
        Animated.spring(
            this.state.animation,
            {
                toValue: 0,
                duration: 5000,
            }
        ).start();
    }
    expand = () => {
        this.setState({
            expanded: true,
        });
        const { animation, height } = this.state;
        animation.setValue(0)
        Animated.spring(
            this.state.animation,
            {
                toValue: height,
                duration: 5000,
            }
        ).start();
    }
    buildTitleElement() {
        const { title, headIcon, extra, collapseable, expanded, headStyle } = this.props;
        if (!title) {
            return null;
        }
        return <CardHeader
            expanded={this.state.expanded}
            collapse={this.collapse}
            expand={this.expand}
            icon={headIcon}
            title={title}
            extra={extra}
            style={headStyle}
            collapseable={collapseable} />
    }
    onPress = () => {
        if (this.props.disabled) {
            return;
        }
        this.props.onClick && this.props.onClick();
    }
    onLayout = (layout) => {
        this.setState({
            height: layout.nativeEvent.layout.height,
        });
    }
    render() {
        const { children, background, style, bookmark, content, wrapElement, bookmarkEmptyStr } = this.props;
        const { expanded, animation } = this.state;
        const headElement = this.buildTitleElement();
        const cnt = this.context.createElement(content);
        const wrap = this.context.createElement(wrapElement);
        let bookmarkElement = null;
        if (bookmark) {
            if (typeof bookmark === 'string') {
                bookmarkElement = (<View style={styles.bookmark}>
                    <ListText style={styles.bookmarkText} yigoid={bookmark} emptyStr={bookmarkEmptyStr} />
                    <View style={styles.bookmarkCornor}>
                    </View>
                </View>);
            } else {
                bookmarkElement = this.context.createElement(bookmark);
            }
        }
        const contentElement = (<TouchableWithoutFeedback onPress={this.onPress}>
            <View style={[styles.card, style]}>
                {
                    bookmarkElement 
                }
                {
                    background ? <ImageBackground source={background} imageStyle={styles.cardBackground} style={styles.cardBackground} />
                        : null
                }
                {
                    headElement
                }
                <Animated.View style={{ height: animation, overflow: 'hidden' }}>
                    <View onLayout={this.onLayout}>
                        {
                            (children || cnt)
                        }
                    </View>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>);
        if (wrap) {
            return React.cloneElement(wrap, {}, contentElement);
        }
        return contentElement;
    }
}
