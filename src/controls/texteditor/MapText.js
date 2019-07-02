import React, { Component } from "react";
import { ControlWrap } from 'yes';
import { View, Text, StyleSheet } from 'react-native';
import {
    Map,
    Base,
    Marker,
    BMapUtil,
} from 'rc-bmap';
import PropTypes from 'prop-types';

const { Point } = Base;

const styles = StyleSheet.create({
    errMsg: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

@ControlWrap
class MapText extends Component {
    static contextTypes = {
        getPosition: PropTypes.func,
        getPoint: PropTypes.func,
        getBaiduMapAk: PropTypes.func,
    }

    defaultProps = {
        valueType: 'gps',
        zoomLevel: 16,
    }

    state = {
        lng: '0',
        lat: '0',
    }

    calcPosition = async (displayValue) => {
        if (!displayValue) {
            return;
        }
        if (this.props.valueType === 'gps') {
            const tmp = displayValue.split(',');
            const pos = { lng: tmp[0], lat: tmp[1] };
            this.setState(pos);
        } else {
            if (this.context.getPoint) {
                const point = await this.context.getPoint(displayValue);
                this.setState(point);
            }
        }
    }

    componentWillMount() {
        try {
            this.calcPosition(this.props.displayValue);
        } catch (ex) {

        }
    }

    componentWillReceiveProps(props) {
        try {
            this.calcPosition(props.displayValue);
        } catch (ex) {

        }
    }

    render() {
        if (!this.context.getBaiduMapAk || !this.context.getBaiduMapAk()) {
            return (
                <View style={[this.props.layoutStyles, styles.errMsg]}>
                    <Text>{this.props.displayValue}</Text>
                </View>);
        }
        return (<View style={this.props.layoutStyles}>
            <Map
                ak={this.context.getBaiduMapAk()}
                scrollWheelZoom
                zoom={this.props.zoomLevel || 16}
            >
                <Point name="center" lng={this.state.lng} lat={this.state.lat} />
                <Marker>
                    <Point lng={this.state.lng} lat={this.state.lat} />
                </Marker>
            </Map>
        </View>);
    }
}

MapText.category = 'yigo';
MapText.detailType = 'texteditor';

export default MapText;
