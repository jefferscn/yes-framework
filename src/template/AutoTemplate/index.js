import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import defaultTemplateMapping from '../defaultTemplateMapping';
import PropTypes from 'prop-types';
import Element from '../Element';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

class AutoTemplate extends PureComponent {
    render() {
        const { containerStyle, items } = this.props;
        return (
            <View style={[styles.container, containerStyle]}>
                {
                    items.map(item=>{
                        <Element meta={item} />
                    })
                }
            </View>
        )
    }
}

defaultTemplateMapping.reg('auto', AutoTemplate);
export default AutoTemplate;
