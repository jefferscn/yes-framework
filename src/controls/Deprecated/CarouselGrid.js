import React, { PureComponent } from 'react';
import { Carousel, Card } from 'antd-mobile';
import { Text } from 'yes-comp-react-native-web';
import { GridRowWrap as gridRowWrap, GridWrap } from 'yes-intf';

const YIGOCard= gridRowWrap(Card)
class CardCarouselGrid extends PureComponent {
    render() {
        const { data, titleField, contentField, extraField, actions, thumbField } = this.props;
        const titleElement = titleField? (<Text yigoid={titleField} />): null;
        const contentElement = contentField ? (<Text yigoid={contentField} />): null;
        const extraElement = extraField? (<Text yigoid={extraField} />): null;
        if(!data) {
            return null;
        }
        return (
            <Carousel 
                autoplay
                infinite
                frameOverflow="visible"
                >
                {
                    data.map((item, index)=>{
                        return (
                            <YIGOCard
                                rowIndex={index}
                                gridId = {this.props.yigoid}
                            >
                                <Card.Header 
                                    title={titleElement}
                                    extra={extraElement}
                                />
                                <Card.Body>
                                    {
                                        contentElement
                                    }
                                </Card.Body>
                            </YIGOCard>
                        );
                    })
                }
            </Carousel>
        )
    }
}

export default GridWrap(CardCarouselGrid);
