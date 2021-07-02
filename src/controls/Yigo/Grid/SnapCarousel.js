import React, { PureComponent } from 'react';
import { ListComponents } from 'yes-comp-react-native-web';
import { View, StyleSheet } from 'react-native';
import { GridRowWrap as gridRowWrap, GridWrap } from 'yes-intf';
import Carousel from 'react-native-snap-carousel';

const { ListImage, ListText } = ListComponents;

const Row = gridRowWrap(View)

const styles = StyleSheet.create({
    title: {
        position: 'absolute',
        bottom: 5,
        left: 10,
        color: 'black'
    }
})
class SnapCarousel extends PureComponent {
    static defaultProps = {
        needThumbnail: false,
        height: 150,
    }
    renderItem = ({ item, index }) => {
        const { style, imageColumn, textColumn } = this.props;
        return (<Row rowIndex={index} style={style}>
            <ListImage
                source=""
                needThumbnail={this.props.needThumbnail}
                w={this.props.w}
                h={this.props.h}
                yigoid={imageColumn}
                style={style} />
            {textColumn ? <ListText style={styles.title} yigoid={textColumn} /> : null}
        </Row>);
    }

    render() {
        const { data, style } = this.props;
        if (!data) {
            return <View style={style} />;
        }
        return (
            <Carousel
                data = {data.toJS()}
                renderItem = {this.renderItem}
                sliderWidth={375}
                itemWidth={350}
                useScrollView 
                enableMomentum={false}
            />
        )
    }
}

export default GridWrap(SnapCarousel);
