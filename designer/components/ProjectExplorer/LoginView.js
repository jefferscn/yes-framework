import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    login: {
        width: 335,
        height: 667,
    }
})

@inject('store')
@observer
class LoginViewer extends Component {
    componentWillUnmount() {
        if (this.frame) {
            this.frame.parentNode.removeChild(this.frame);
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.login}>
                    <iframe
                        ref={(ref) => this.frame = ref}
                        src={`/designer#Login`}
                        width="800"
                        height="667"
                    />
                </View>
            </View>
        )
    }
}

export default LoginViewer;
