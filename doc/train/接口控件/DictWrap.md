# DictWrap
    这个是用于包装字典控件的高阶函数
## 使用方法
    假设A是一个字典的渲染控件，则我们使用DictWrap将渲染控件A与YIGO的单据关联起来,
    经过了DictWrap包装的渲染控件就可以在框架中被使用了。

```javascript
import { DictWrap as dictWrap } from 'yes';
...

export default dictWrap(A);
```

## 接口
```javascript
    render() {
        var state = this.state.state;
        const comp = this.context.getContextComponent(this.props.yigoid);
        const caption = this.getBuddyCaption();
        return (<BaseComponent
            {...comp && comp.metaObj}
            textLoading={this.state.textLoading}
            visible={!!this.state.visible}
            disabled={!state.get('enable')}
            hasMore={this.state.hasMore}
            visible={state.get('visible')}
            controlState={state}
            caption={caption}
            items={this.state.items}
            displayValue={this.state.displayValue}
            loading={this.state.loading}
            modalVisible={this.state.modalVisible}
            onChangePopupState={this.onChangePopupState}
            onChange={this.onChange}
            onQuery={this.onQuery}
            onLoadMore={this.onLoadMore}
            fromCache={this.state.fromCache}
            {...this.props}
        />);
    }
```
* hasMore

    由于标识当前字典是否还有未被加载的项目

* items

    字典数据

* loading

    当前是否在加载数据中，这个loading是加载字典项目的时候的标识

* onQuery

    查询函数，用于对字典数据进行过滤，有个参数是字符串

* onLoadMore

    用于加载更多字典项目，没有参数

* fromCache

    字典有一种特殊模式，当fromCache=true的时候，这个单据中的这个字典控件在初始化的时候将不会从后台加载字典数据，而是从cache中读取以前使用过的项目，同时当完成选择之后，当前选择的项目也将被记录到cache中