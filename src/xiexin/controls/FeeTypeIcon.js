import React, { PureComponent } from 'react';
import FontIcon from 'yes-framework/font';

class FeeTypeIcon extends PureComponent {
    getIconSetting = ()=> {
        const { value, text } = this.props;
        let iconName= '', iconSize=12, color= null;
        if(text.startsWith('住宿'))  {
            iconName='icon-jiudian';
        }
        if(text === '机票') {
            iconName='icon-jipiao';
        }
        if(text.startsWith('火车')) {
            iconName= 'icon-train';
        }
        if(text==='出租车') {
            iconName='icon-icon-test-copy';
        }
        if(text.startsWith('滴滴')) {
            iconName='icon-didi';
        }
        if(text==='长途客运') {
            iconName='icon-jiaotong';
        }
        if(text==='餐费') {
            iconName='icon-canyin';
        }
        if(text==='通讯') {
            iconName='icon-wangluo-'
        }
        if(text=='船票') {
            iconName='icon-FSSC_ShipTicketBooks';
        }
        if(text=='差旅补贴') {
            iconName='icon-FSSC_TravelAllowanceBooks';
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
            <FontIcon {...setting} />
        )
    }
}

export default FeeTypeIcon;
