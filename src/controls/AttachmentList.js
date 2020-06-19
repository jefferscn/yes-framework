import React, { PureComponent } from 'react';
import { GridWrap, GridRowWrap, ControlWrap } from 'yes-intf';
import { Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({

});

@ControlWrap
class AttachmentFile extends PureComponent {
    isImage = ()=> {
        const { fileType } = this.props;
        return fileType==='jpg' || fileType==='png';
    }
    render() {
        const { displayValue, fileType } = this.props;
        if(this.isImage()) {
            return (
                <Image src={displayValue} />
            )
        }
        return (
            <View>
                <Text>{fileType}</Text>
            </View>
        )
    }
}

@GridRowWrap
class AttachmentItem extends PureComponent {
    static defaultProps = {
        removable: false,
        fileType: null,
        url: null
    }
    onRemove = ()=> {

    }
    render() {
        const { removable, onPress, imageUrl, fileType } = this.props;
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View>
                    <AttachmentFile fileType={fileType}  yigoid={imageUrl} />
                    {removable?<TouchableWithoutFeedback onPress={this.onRemove}>

                    </TouchableWithoutFeedback>: null}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

class AttachmentList extends PureComponent {
    static contextTypes = {
        getOwner: PropTypes.func,
    }
    static defualtProps = {
        removable: true,
    }
    render() {
        const { data, fileName, filePath, isVirtual, containerStyle, removable, editable } = this.props;
        const grid = this.context.getOwner();
        if(!grid) {
            return null;
        }
        const fileNameIndex = grid.getCellIndexByKey(fileName);
        return (
            <View style={[styles.container, containerStyle]}>
                {
                    data.map((item, index) => {
                        const fn = item.getIn([index, 'data', fileNameIndex, 0]);
                        const fnArray = fn.split(',');
                        const fileType = fnArray.length>1 ? fnArray[fnArray.length-1]: null;
                        return (<AttachmentItem
                            rowIndex={index}
                            removable={removable && editable}
                            fileType = {fileType}
                            fileUrl = {filePath}
                        />);
                    })
                }
            </View>
        )
    }
}

export default GridWrap(AttachmentList);
