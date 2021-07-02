import React, { PureComponent } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {

    },
    foot: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
    },
    content: {
        maxHeight: 400,
    }
});

export default class QueryContainer extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
        onValueChange: PropTypes.func,
    }
    static defaultProps = {
        okText: "查询",
        clearText: "清除",
        supportClear: true,
    }
    onClear = async () => {
        const { clearControls } = this.props;
        for (let item of clearControls) {
            await this.context.onValueChange(item, null);
        }
        this.onQuery();
    }
    onQuery = () => {
        this.props.onChange && this.props.onChange();
    }
    render() {
        const { style, content, supportClear, okText, clearText, footStyle } = this.props;
        const contentElement = this.context.createElement(content)
        return (
            <View style={[styles.container, style]}>
                {
                    <View style={[styles.content]}>
                        {
                            contentElement
                        }
                    </View>
                }
                <View style={[styles.foot, footStyle]}>
                    {
                        supportClear ? <View style={[styles.button]}>
                            <Button onPress={this.onClear} title={clearText} />
                        </View> : null
                    }
                    <View style={[styles.button]}>
                        <Button onPress={this.onQuery} title={okText} />
                    </View>
                </View>
            </View>
        )
    }
}
