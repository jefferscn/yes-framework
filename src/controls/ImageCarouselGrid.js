import React, { PureComponent } from 'react';
import Carousel from 'nuka-carousel';
import { ListComponents } from 'yes-comp-react-native-web';
import { View, StyleSheet } from 'react-native';
import { GridRowWrap as gridRowWrap, GridWrap } from 'yes-intf';

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
        height: 150,
    }
    render() {
        const { data, imageColumn, textColumn, style, height } = this.props;
        if(!data) {
            return <View style={style} />;
        }
        return (
            <Carousel 
                autoplay
                height={height}
                wrapAround
                initialSlideHeight={height}
                withoutControls={true}
                >
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
                                {textColumn? <ListText style={styles.title} yigoid={textColumn} />:null}
                            </Row>  
                        );
                    })
                }
            </Carousel>
        )
    }
}

export default GridWrap(ImageCarouselGrid);
