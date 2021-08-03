var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { useEffect, useState, PureComponent } from 'react';
import { View, StyleSheet, Text, ImageBackground, Animated, TouchableWithoutFeedback } from 'react-native';
import { ControlWrap } from 'yes-intf';
import ListText from '../Yigo/Text/ListText';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import Element from '../../template/Element';
var AnimatedIcon = Animated.createAnimatedComponent(Icon);
var styles = StyleSheet.create({
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
        // textAlign: 'right',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    foot: {
        paddingBottom: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    }
});
var CardHeader = function (props) {
    var buildIcon = function () {
        var icon = props.icon, iconStyle = props.iconStyle;
        if (!icon) {
            return null;
        }
        if (typeof icon === 'string') {
            return React.createElement(Icon, { name: icon, style: iconStyle });
        }
        return React.createElement(Element, { meta: icon });
    };
    var buildTitle = function () {
        var title = props.title, titleStyle = props.titleStyle;
        if (!title) {
            return null;
        }
        if (typeof title === 'string') {
            return React.createElement(Text, { style: styles.cardTitle }, title);
        }
        return React.createElement(Element, { meta: title });
    };
    var buildExtra = function () {
        var extra = props.extra, extraStyle = props.extraStyle;
        if (!extra) {
            return React.createElement(View, { style: { flex: 1 } });
        }
        return React.createElement(View, { style: { flexDirection: 'row', justifyContent: 'flex-end', flex: 1 } },
            React.createElement(Element, { meta: extra }));
    };
    var onPress = function () {
        var expanded = props.expanded;
        if (expanded) {
            props.collapse && props.collapse();
            return;
        }
        props.expand && props.expand();
    };
    var expandAnimation = useState(new Animated.Value(0))[0];
    var buildCollapse = function () {
        var collapseable = props.collapseable, expanded = props.expanded;
        if (!collapseable) {
            return null;
        }
        var angle = expandAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: !expanded ? ['360deg', '180deg'] : ['0deg', '180deg'],
            extrapolate: 'clamp',
        });
        return (React.createElement(TouchableWithoutFeedback, { onPress: onPress },
            React.createElement(AnimatedIcon, { style: [styles.icon, {
                        transform: [
                            {
                                rotate: angle,
                            }
                        ]
                    }], name: "angle-up", size: 20, color: "#999999" })));
    };
    var style = props.style, expanded = props.expanded;
    useEffect(function () {
        Animated.spring(expandAnimation, {
            toValue: props.expanded ? 0 : 1,
            duration: 300
        }).start();
    }, [expanded]);
    return (React.createElement(View, { style: [styles.cardHead, style] },
        buildIcon(),
        buildTitle(),
        buildExtra(),
        buildCollapse()));
};
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            expanded: _this.props.collapseable ? _this.props.expanded : true,
            animation: new Animated.Value(),
        };
        _this.collapse = function () {
            _this.setState({
                expanded: false,
            });
            var _a = _this.state, animation = _a.animation, height = _a.height;
            animation.setValue(height);
            Animated.spring(_this.state.animation, {
                toValue: 0,
                duration: 500,
            }).start();
        };
        _this.expand = function () {
            _this.setState({
                expanded: true,
            });
            var _a = _this.state, animation = _a.animation, height = _a.height;
            animation.setValue(0);
            Animated.spring(_this.state.animation, {
                toValue: height,
                duration: 500,
            }).start();
        };
        _this.onPress = function () {
            if (_this.props.disabled) {
                return;
            }
            _this.props.onClick && _this.props.onClick();
        };
        _this.onLayout = function (layout) {
            _this.setState({
                height: layout.nativeEvent.layout.height,
            });
        };
        return _this;
    }
    Card.prototype.buildTitleElement = function () {
        var _a = this.props, title = _a.title, headIcon = _a.headIcon, extra = _a.extra, collapseable = _a.collapseable, expanded = _a.expanded, headStyle = _a.headStyle, extraStyle = _a.extraStyle, iconStyle = _a.iconStyle;
        if (!title) {
            return null;
        }
        return React.createElement(CardHeader, { expanded: this.state.expanded, collapse: this.collapse, expand: this.expand, icon: headIcon, title: title, extra: extra, extraStyle: extraStyle, style: headStyle, iconStyle: iconStyle, collapseable: collapseable });
    };
    Card.prototype.buildFootElement = function () {
        return (React.createElement(View, { style: styles.foot }));
    };
    Card.prototype.render = function () {
        var _a = this.props, children = _a.children, background = _a.background, style = _a.style, bookmark = _a.bookmark, content = _a.content, wrapElement = _a.wrapElement, bookmarkEmptyStr = _a.bookmarkEmptyStr;
        var _b = this.state, expanded = _b.expanded, animation = _b.animation;
        var headElement = this.buildTitleElement();
        var cnt = this.context.createElement(content);
        var wrap = this.context.createElement(wrapElement);
        var footElement = this.buildFootElement();
        var bookmarkElement = null;
        if (bookmark) {
            if (typeof bookmark === 'string') {
                bookmarkElement = (React.createElement(View, { style: styles.bookmark },
                    React.createElement(ListText, { style: styles.bookmarkText, yigoid: bookmark, emptyStr: bookmarkEmptyStr }),
                    React.createElement(View, { style: styles.bookmarkCornor })));
            }
            else {
                bookmarkElement = this.context.createElement(bookmark);
            }
        }
        var contentElement = (React.createElement(TouchableWithoutFeedback, { onPress: this.onPress },
            React.createElement(View, { style: [styles.card, style] },
                bookmarkElement,
                background ? React.createElement(ImageBackground, { source: background, imageStyle: styles.cardBackground, style: styles.cardBackground })
                    : null,
                headElement,
                React.createElement(Animated.View, { style: { height: animation, overflow: 'hidden' } },
                    React.createElement(View, { onLayout: this.onLayout }, (children || cnt))),
                footElement)));
        if (wrap) {
            return React.cloneElement(wrap, {}, contentElement);
        }
        return contentElement;
    };
    Card.contextTypes = {
        createElement: PropTypes.func,
    };
    Card = __decorate([
        ControlWrap
    ], Card);
    return Card;
}(PureComponent));
export default Card;
