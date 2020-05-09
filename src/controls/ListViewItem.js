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
        if (this.props.detailElement) {
            return (<View style={[this.props.divider ? styles.divider : {}]}>
                <TouchableOpacity onPress={this.onPress} pressRetentionOffset={pressRetentionOffset}>
                    <View style={[styles.container, this.props.containerStyle]}>
                        {this.renderLeftElement()}
                        {this.renderCenterElement()}
                        {this.renderRightElement()}
                        {this.renderArrow()}
                        {this.renderExtra()}
                    </View>
                </TouchableOpacity>
                {
                    this.renderDetail()
                }
            </View>)
        }
        return (
            <TouchableOpacity onPress={this.onPress} pressRetentionOffset={pressRetentionOffset}>
                <View style={[styles.container, this.props.divider ? styles.divider : {}, this.props.containerStyle]}>
                    {this.renderLeftElement()}
                    {this.renderCenterElement()}
                    {this.renderRightElement()}
                    {this.renderArrow()}
                    {this.renderExtra()}
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    arrow: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        display: 'flex',
        width: 20,
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
