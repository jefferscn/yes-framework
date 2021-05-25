# ControlWrap
    这是普通控件的包装函数，用于文本，按钮等没有特别数据结构的控件
## 使用方法
```javascript 
import React, { PureComponent } from 'react';
import { ControlWrap as controlWrap } from 'yes';
import { Text, View } from 'react-native';

class ShortName extends PureComponent {
    calcText() {
        if (!this.props.displayValue) {
            return '';
        }
        let txt = this.props.displayValue.split(' ')[0];
        return txt;
    }

    render() {
        return (<View style={this.props.layoutStyles}>
            <Text style={this.props.textStyles}>{this.calcText()}</Text>
        </View>);
    }
}

export default controlWrap(ShortName);
```
当然如果开发环境支持ES6的Decorators也可以这样写
```javascript 
import React, { PureComponent } from 'react';
import { ControlWrap as controlWrap } from 'yes';
import { Text, View } from 'react-native';

@controlWrap
class ShortName extends PureComponent {
    calcText() {
        if (!this.props.displayValue) {
            return '';
        }
        let txt = this.props.displayValue.split(' ')[0];
        return txt;
    }

    render() {
        return (<View style={this.props.layoutStyles}>
            <Text style={this.props.textStyles}>{this.calcText()}</Text>
        </View>);
    }
}

export default ShortName;
```

## 接口

    这里我要偷个懒，暂时没有时间将每个属性都一一进行介绍，但是大部分的属性的意义应该是一目了然的，我只把一些不好理解的属性解释一下

```javascript
return (<BaseComponent
    {...comp && comp.metaObj}
    // disabled={!this.state.enable}
    // visible={!!this.state.visible}
    disabled={!state.get('enable')}
    visible={state.get('visible')}
    isVirtual={!!state.get('isVirtual')}
    textLoading={this.state.textLoading}
    controlState={state}
    onChange={this.onChange}
    uploadImage={this.uploadImage}
    onClick={this.onClick}
    caption={caption}
    displayValue={this.state.displayValue}
    placeholder={this.formatMessage('Please input ') + caption}
    onChangePopupState={this.onChangePopupState}
    modalVisible={this.state.modalVisible}
    {...otherProps}
```
* isVirtual

    这个属性标识一种状态，当控件所属的单据的配置还没有读取到前台的时候isVirtual=true

* textLoading

    这个属性标识一种状态，当控件的数据已经加载，但是现实值还在计算的时候textLoading=true

* displayValue

    控件的显示值，这个值和PC端的显示值是一样的

* modalVisible

    如果控件内部实现需要弹出界面，则弹出状态由这个属性控制

* onChangePopupState

    如果控件内部实现需要弹出界面，则当弹出界面的状态发生变化的时候，调用这个函数

* controlState

    当前控件的状态，包括enable,visible,value这些属性都可以通过这个属性进行获取，这个属性是一个ImmutableObject对象，无法直接使用一般的js语法进行读取，比如controlState['value'],这种语法是不行的，必须写成controlState.get('value')

* uploadImage(file:Blob, name:String)

    这个方法调用当前系统中的上传图片功能