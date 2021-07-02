# ComboboxWrap

## 使用方法

    同ControlWrap

# 接口
```javascript
        return (<BaseComponent
            {...comp.metaObj}
            disabled={!state.get('enable')}
            visible={visible}
            controlState={state}
            caption={caption}
            items={state.get('items')}
            displayValue={this.state.displayValue}
            showPopup={this.state.showPopup}
            modalVisible={this.state.showPopup}
            onChangePopupState={this.onChangePopupState}
            onChange={this.onChange}
            {...this.props}
        />);
```
* items

    下拉框数据
* showPopup

    modalVisible的别名,历史遗留属性