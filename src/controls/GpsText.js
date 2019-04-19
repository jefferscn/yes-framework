import React, { Component } from "react";
import { ControlWrap } from 'yes';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

class GpsText extends Component {
    static defaultProps = {
        autoLocation: false,
        autoInterval: 10 * 1000,
        mode: 'gps',
    }

    static contextTypes = {
        getPosition: PropTypes.func,
        getCurrentAddress: PropTypes.func,
    }

    state = {
        loading: false,
    }

    async componentWillMount() {
        try {
            await this.locate();
        } catch (ex) {
            this.setState({
                loading: false,
            });
        }
    }

    locate = async () => {
        if (this.props.mode === 'gsp') {
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
    }

    render() {
        return (<View style={this.props.layoutStyles}>
            <Text style={this.props.textStyles}>{this.props.displayValue}</Text>
        </View>);
    }
}

export default ControlWrap(GpsText);
