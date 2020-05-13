import React, { PureComponent } from 'react';
import { Carousel } from 'antd-mobile';
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
    render() {
        const { data, imageColumn, textColumn, style } = this.props;
        if(!data) {
            return null;
        }
        return (
            <Carousel 
                autoplay
                infinite
                frameOverflow="visible"
                dots={false}
                >
                {
                    data.map((item, index)=>{
                        return (
                            <Row rowIndex={index}>
                                <ListImage yigoid={imageColumn} style={style}/>
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
