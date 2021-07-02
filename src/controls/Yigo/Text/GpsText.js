import React, { Component } from "react";
import { ControlWrap } from 'yes';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    text: {
        paddingTop: 9,
        paddingBottom: 9,
        display: 'flex',
        alignItems: 'center',
    }
})
class GpsText extends Component {
    static defaultProps = {
        autoLocation: false,
        autoInterval: 20 * 1000,
        mode: 'gps',
    }

    static contextTypes = {
        getPosition: PropTypes.func,
        getCurrentAddress: PropTypes.func,
    }

    state = {
        loading: false,
        error: false,
        errorMsg: '',
    }

    async componentWillMount() {
        if (this.props.autoLocation) {
            this.timer = setInterval(this.locate, this.props.autoInterval);
        } else {
            await this.locate();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.autoInterval !== this.props.autoInterval ||
            prevProps.autoLocation !== this.props.autoLocation) {
            if (this.timer) {
                clearInterval(this.timer);
            }
            if (this.props.autoLocation) {
                this.timer = setInterval(this.locate, this.props.autoInterval);
            }
            if(!this.state.loading) {
                this.locate();
            }
        }
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    locate = async () => {
        try {
            if (this.props.mode === 'gps') {
                if (this.context.getPosition) {
                    this.setState({
                        loading: true,
                    });
                    const pos = await this.context.getPosition();
                    this.setState({
                        loading: false,
                    });
                    this.props.onChange([pos.longitude, pos.latetude].join(','));
                }
            } else {
                if (this.context.getCurrentAddress) {
                    this.setState({
                        loading: true,
                    });
                    const address = await this.context.getCurrentAddress();
                    this.setState({
                        loading: false,
                    });
                    this.props.onChange(address.address);
                }
            }
        } catch (ex) {
            this.setState({
                error: true,
                errorMsg: ex.message || ex,
                loading: false,
            });
        }
    }

    render() {
        return (<View style={[styles.container, this.props.layoutStyles, this.props.style]}>
            <Text style={[styles.text, this.props.textStyles]}>{this.state.error ? this.state.errorMsg : this.props.displayValue}</Text>
            {
                this.state.loading ? <ActivityIndicator /> : null
            }
        </View>);
    }
}

export default ControlWrap(GpsText);
