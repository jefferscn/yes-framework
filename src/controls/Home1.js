import React, { PureComponent } from 'react';
import { CustomBillForm } from 'yes-comp-react-native-web';
import { View } from 'react-native';
import CardCarouselGrid from './CarouselGrid';

class Home1 extends PureComponent {
    render() {
        return (
            <View>
                <CustomBillForm formKey={'SYSNotice'} oid={-1} status='DEFAULT'>
                    <CardCarouselGrid yigoid="Grid1" titleField="title" contentField="Context" extraField="BillDate" />
                </CustomBillForm>
            </View>
        )
    }
}

export default Home1;
