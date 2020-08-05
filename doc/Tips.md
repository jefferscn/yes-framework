## 如何改变PC端单据的打开方式
> PC端的单据可能是以一个新页面方式打开，但是在App上希望以模态方式打开，由于我们希望不去影响PC端的代码，所以我们提供了一个映射表来确定哪些单据需要以模态方式打开。

* config/modal.json

    这文件中包含了需要以模态方式打开的所有单据的key



## 代码中如何打开单据
> 可以引用yes-framework中的navigateUtil中的openForm来打开单据

```
import { openForm, newForm, openModal } from 'yes-framework/util/navigateUtil';

openForm('TSL_ToDoList', -1, 'EDIT');
```
* openForm

>以页面方式打开一张单据

* newForm

> 以页面方式新增一张单据

* openModal

> 以模态方式打开一张单据

## 代码中如何进行回退

```
import { History } from 'yes-web'

Histroy.goBack();
```


## 单据的参数该如何传入

> 项目目录中存在一个formpara的目录，对于初始单据的参数可以在这里进行设置，具体的格式可以参考目录中的example文件

> 如果出现一个单据使用不同的参数，可以通过在单据的key后面增加“*”然后再接一段标识用的字符串即可。

```
{
    "CB_ProjectGRView*1": {
        "IsPlaneTicket1": 0,
        "ReimburseType": 1,
        "BXType": 0
    },
    "CB_ProjectGRView*2": {
        "IsPlaneTicket1": 0,
        "ReimburseType": 1,
        "BXType": 0
    }
}
```

上面的例子就是同一个单据,使用两个不同的参数组。

## 如何实现弹出式单据的效果

  ![图片描述](./res/showformasmodal.gif)

  >需要达到上面图片中的效果，需要做如下几个步骤


1. 在modal.json中添加单据key

2. 使用modal模板定制单据

    ```json
    {
        "formTemplate": "modal",
        "keepAlive": true,
        "content": {
            "type": "element",
            "elementType": "ChainDict",
            "elementProps": {
                "yigoid": "FeeTypeID",
                "inline": true,
                "imgElement": {
                    "type": "element",
                    "elementType": "FeeTypeIcon",
                    "elementProps": {
                    }
                }
            }
        },
        "style": {
            "height": 500
        },
        "autoClose": true,
        "popup": true,
        "actions": [{
            "text": "新建账本",
            "yigoid": "NewBooks"
        }]
    }
    ```

3. 如果弹出的单据使用modal模板无法达到效果，则可以通过custom模板进行定制

    ```javascript
    import React, { PureComponent } from 'react';
    import { Modal } from 'antd-mobile';
    import PropTypes from 'prop-types';
    import GridView from 'yes-framework/controls/GridView';

    export default class ExpenseAccountBillImport extends PureComponent {
        static contextTypes = {
            getPicture: PropTypes.func,
            getBillForm: PropTypes.func,
            uploadImage: PropTypes.func,
            onValueChange: PropTypes.func,
            onControlClick: PropTypes.func,
        }
        onClose = () => {
            this.props.onClose && this.props.onClose();
        }
        onCancel= () => {
            this.props.onClose && this.props.onClose();
        }
        render() {
            return (<Modal
                visible={true}
                popup={true}
                animationType={'slide-up'}
                transparent
                maskClosable={false}
                // onClose={this.onClose}
                title="出差申请单导入"
                footer={[{
                    text: '取消',
                    onPress: this.onCancel,
                }]}
                // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                // afterClose={this.onClose}
            >
                <GridView
                    yigoid="Grid1"
                    useBodyScroll={true}
                    showArrow={false}
                    primaryKey="NO_LV"
                    secondKey={["Region"]}
                    clickMode="dblclick"
                    hideAction={true}
                    tertiaryKey={["PersonnelID_LV"]}
                />
            </Modal>);
        }
    }
```

