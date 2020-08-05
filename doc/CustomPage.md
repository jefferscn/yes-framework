手写包含Yigo单据的页面
===================================

CustomBillForm
----------------------------------

> 使用CustomBillForm这个React控件来包裹对应单据的渲染部分就可以，使用的时候和普通的React控件是一样的

引入方式
```javascript
import { CustomBillForm } from 'yes-comp-react-native-web';
```

```javascript
import React, { PureComponent } from 'react';
import { CustomBillForm } from 'yes-comp-react-native-web';
import { View, ScrollView } from 'react-native';
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
```

上面的例子就是在react为基础的应用中如何嵌入一个yigo单据的方式