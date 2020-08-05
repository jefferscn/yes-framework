import React, { PureComponent } from 'react';
import FontIcon from 'yes-framework/font';

class SourceTypeIcon extends PureComponent {
    getIconSetting = ()=> {
        const { value, text } = this.props;
        let iconName= '', iconSize=12, color= null;
        if(text.startsWith('手工')) {
            iconName='icon-shougongluru';
        }
        if(text === '发票识别') {
            iconName='icon-OCR';
        }
        if(text.startsWith('导入')) {
            iconName= 'icon-danju';
        }
        return {
            name: iconName,
            size: 20,
            color: '#28a8d9',
        }
    }
    render() {
        const setting = this.getIconSetting();
        return (
            <FontIcon style={this.props.style} {...setting} />
        )
    }
}

export default SourceTypeIcon;
