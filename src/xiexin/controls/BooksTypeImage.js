import React, { PureComponent } from 'react';
import { ControlWrap } from 'yes-intf';
import FontIcon from 'yes-framework/font';
import { View } from 'react-native';

class BooksTypeImage extends PureComponent {
    getSetting = () => {
        const { value } = this.props;
        let icon = '',color='#28a8d9';
        icon = `icon-${value}`;
        // switch(value) {
        //     case 'FSSC_HotelBooks':
        //         icon = 'icon-jiudian';
        //         break;
        //     case 'FSSC_TrainTicketBooks':
        //         icon= 'icon-train';
        //         break;
        //     case 'FSSC_ShipTicketBooks':
        //         icon= 'icon-chuanpiao';
        //         break;
        //     case 'FSSC_TaxiBooks':
        //         icon = 'icon-icon-test-copy';
        //         break;
        //     case 'FSSC_CommunicationBooks':
        //         icon = 'icon-wangluo-'
        //         break;
        //     case 'FSSC_CoachBooks':
        //         icon= ''
        //         break;
        //     case 'FSSC_CateringBooks':
        //         icon= 'icon-canyin';
        //         break;
        //     case 'FSSC_GeneralBooks': 
        //         icon = 'icon-myaccount';
        //         break;
        //     case 'FSSC_AirTicketBooks':
        //         icon='icon-jipiao';
        //         break;
        //     case 'FSSC_TravelAllowanceBooks':
        //         icon='icon-x-';
        //         break;
        //     case 'FSSC_OnlineItineraryBooks':
        //         icon='icon-wangyueche';
        //         break;
        //     case 'FSSC_ExpenseAccountBill': 
        //         icon='icon-chuchashenqingdan';
        //         break;
        //     case 'FSSC_Personnel_Change':
        //         icon='';
        //         break;
        //     case 'FSSC_HospitalityReimbursement':
        //         icon='icon-ywzdbx';
        //         break;
        // }
        return {
            name: icon,
            color
        };
    }
    render() {
        const { style } = this.props;
        const setting = this.getSetting();
        return (
            <View style={style}>
                <FontIcon
                    name={setting.name}
                    size={26}
                    color={setting.color}
                />
            </View>
        )
    }
}

export default ControlWrap(BooksTypeImage);
