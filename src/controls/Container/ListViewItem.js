import React  from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const pressRetentionOffset = { top: 5, left: 5, right: 5, bottom: 5 };

export default (props) => {
    const renderLeftElement = () => {
        return props.leftElement;
    }

    const renderCenterElement = () => {
        return props.centerElement;
    }

    const renderRightElement = () => {
        return props.rightElement;
    }

    const renderArrow = () => {
        return props.showArrow ? <Icon style={styles.arrow} name='chevron-right' /> : null;
    }

    const renderExtra = () => {
        return props.extra || null;
    }

    const onPress = () => {
        props && props.onPress(props.rowIndex);
    }

    const renderDetail = () => {
        return props.detailElement;
    }

    const { containerView } = props;
    let container = null;

    if (props.detailElement) {
        if (containerView) {
            container = React.cloneElement(containerView, {
                style: [styles.container, props.containerStyle]
            }, [
                renderLeftElement(),
                renderCenterElement(),
                renderRightElement(),
                renderArrow(),
                renderExtra(),
            ]);
        } else {
            container = (<View style={[styles.container, props.containerStyle]}>
                {renderLeftElement()}
                {renderCenterElement()}
                {renderRightElement()}
                {renderArrow()}
                {renderExtra()}
            </View>);

        }
        return (<View style={[props.divider ? [styles.divider, props.dividerStyle] : {}]}>
            <TouchableOpacity onPress={onPress} pressRetentionOffset={pressRetentionOffset}>
                {
                    container
                }
            </TouchableOpacity>
            {
                renderDetail()
            }
        </View>)
    }
    if (containerView) {
        container = React.cloneElement(containerView, {
            style: [styles.container, props.divider ? [styles.divider, props.dividerStyle] : {}, props.containerStyle]
        }, [
            renderLeftElement(),
            renderCenterElement(),
            renderRightElement(),
            renderArrow(),
            renderExtra(),
        ]);
    } else {
        container = (<View style={[styles.container, props.divider ? [styles.divider, props.dividerStyle] : {}, props.containerStyle]}>
            {renderLeftElement()}
            {renderCenterElement()}
            {renderRightElement()}
            {renderArrow()}
            {renderExtra()}
        </View>);
    }
    return (
        <TouchableOpacity onPress={onPress} pressRetentionOffset={pressRetentionOffset}>
            {
                container
            }
        </TouchableOpacity>
    );
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
