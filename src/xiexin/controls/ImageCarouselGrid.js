import React, { PureComponent } from 'react';
// import { Carousel } from 'antd-mobile';
import Carousel from 'nuka-carousel';
import { ListComponents } from 'yes-comp-react-native-web';
import { View, StyleSheet } from 'react-native';
import { GridRowWrap as gridRowWrap, GridWrap } from 'yes-intf';
// import Carousel from 'react-m-carousel';

const { ListImage, ListText } = ListComponents;

const Row= gridRowWrap(View)

const styles = StyleSheet.create({
    title: {
        position: 'absolute',
        bottom: 5,
        left: 10,
        color: 'white'
    }
})
class ImageCarouselGrid extends PureComponent {
    static defaultProps = {
        needThumbnail: false,
    }
    render() {
        const { data, imageColumn, textColumn, style } = this.props;
        if(!data) {
            return <View style={style} />;
        }
        return (
            <Carousel 
                autoplay
                height={150}
                wrapAround
                initialSlideHeight={150}
                withoutControls={true}
                >
            {/* <Carousel
                loop
                auto={3000}
                > */}
                {
                    data.map((item, index)=>{
                        return (
                            <Row rowIndex={index} style={style}>
                                <ListImage 
                                    needThumbnail={this.props.needThumbnail} 
                                    w = {this.props.w}
                                    h = {this.props.h}
                                    yigoid={imageColumn} 
                                    style={style}/>
                                <ListText style={styles.title} yigoid={textColumn} />
                            </Row>  
                        );
                    })
                }
            </Carousel>
        )
    }
}

export default GridWrap(ImageCarouselGrid);
