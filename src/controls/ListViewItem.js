import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const pressRetentionOffset = { top: 5, left: 5, right: 5, bottom: 5 };

export default class ListViewItem extends PureComponent {
    static defaultProps = {
        divider: true,
    }
    renderLeftElement() {
        return this.props.leftElement;
    }

    renderCenterElement() {
        return this.props.centerElement;
    }

    renderRightElement() {
        return this.props.rightElement;
    }

    renderArrow() {
        return this.props.showArrow ? <Icon style={styles.arrow} name='chevron-right' /> : null;
    }

    renderExtra() {
        return this.props.extra || null;
    }

    onPress = () => {
        this.props.onPress();
    }

    renderDetail() {
        return this.props.detailElement;
    }

    render() {
        const { containerView } = this.props;
        let container = null;

        if (this.props.detailElement) {
            if (containerView) {
                container = React.cloneElement(containerView, {
                    style: [styles.container, this.props.containerStyle]
                }, [
                    this.renderLeftElement(),
                    this.renderCenterElement(),
                    this.renderRightElement(),
                    this.renderArrow(),
                    this.renderExtra(),
                ]);
            } else {
                container = (<View style={[styles.container, this.props.containerStyle]}>
                    {this.renderLeftElement()}
                    {this.renderCenterElement()}
                    {this.renderRightElement()}
                    {this.renderArrow()}
                    {this.renderExtra()}
                </View>);

            }
            return (<View style={[this.props.divider ? [styles.divider, this.props.dividerStyle] : {}]}>
                <TouchableOpacity onPress={this.onPress} pressRetentionOffset={pressRetentionOffset}>
                    {
                        container
                    }
                    {/* <View style={[styles.container, this.props.containerStyle]}>
                        {this.renderLeftElement()}
                        {this.renderCenterElement()}
                        {this.renderRightElement()}
                        {this.renderArrow()}
                        {this.renderExtra()}
                    </View> */}
                </TouchableOpacity>
                {
                    this.renderDetail()
                }
            </View>)
        }
        if (containerView) {
            container = React.cloneElement(containerView, {
                style: [styles.container, this.props.divider ? [styles.divider, this.props.dividerStyle] : {}, this.props.containerStyle]
            }, [
                this.renderLeftElement(),
                this.renderCenterElement(),
                this.renderRightElement(),
                this.renderArrow(),
                this.renderExtra(),
            ]);
        } else {
            container = (<View style={[styles.container, this.props.divider ? [styles.divider, this.props.dividerStyle] : {}, this.props.containerStyle]}>
                {this.renderLeftElement()}
                {this.renderCenterElement()}
                {this.renderRightElement()}
                {this.renderArrow()}
                {this.renderExtra()}
            </View>);
        }
        return (
            <TouchableOpacity onPress={this.onPress} pressRetentionOffset={pressRetentionOffset}>
                {
                    container
                }
                {/* <View style={[styles.container, this.props.divider ? [styles.divider, this.props.dividerStyle] : {}, this.props.containerStyle]}>
                    {this.renderLeftElement()}
                    {this.renderCenterElement()}
                    {this.renderRightElement()}
                    {this.renderArrow()}
                    {this.renderExtra()}
                </View> */}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    arrow: {
        alignItems: 'center',
        display: 'flex',
        color: 'rgba(0,0,0,0.6)',
    },
    centerStyle: {

    },
    primaryContainer: {

    },
    primaryText: {

    },
    secondaryContainer: {

    },
    secondaryText: {

    },
});
