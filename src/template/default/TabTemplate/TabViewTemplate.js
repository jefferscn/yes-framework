import React, { Component } from 'react';
import CellLayoutTemplate from './CellLayoutTemplate';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Animated, Text } from 'react-native';
import TabLabel from './TabLabel';
import AwesomeFontIcon from 'react-native-vector-icons/FontAwesome';
import { observable, action } from 'mobx';
import { internationalWrap, getMappedComponentHOC } from 'yes'; // eslint-disable-line import/no-unresolved
import { TabView } from 'yes-platform'; // eslint-disable-line import/no-unresolved
import { DragSource, DropTarget } from 'react-dnd'
import TabPanel from './TabPanel';
import { RotationGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
const CellLayout = getMappedComponentHOC(CellLayoutTemplate);
import uuidv4 from 'uuid/v4';
// if (__DESIGN__) {
import { DndProvider } from 'react-dnd'
import HTML5Backend, { getEmptyImage } from 'react-dnd-html5-backend'
// }

// const { TabView, TextGrid } = Components;

const sourceSpec = {
    beginDrag(props, monitor, component) {
        // 返回需要注入的属性
        return {
            id: props.meta.key
        }
    },
    endDrag(props, monitor, component) {
        // ..
    },
    canDrag(props, monitor) {
        // ..
        return true;
    },
    isDragging(props, monitor) {
        // ..
        return true;
    }
};
function collect(connect, monitor) {
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDragSource: connect.dragSource(),
        // You can ask the monitor about the current drag state:
        isDragging: monitor.isDragging(),
        connectDragPreview: connect.dragPreview()
    }
}
const targetSpec = {
    drop(props, monitor, component) {
        // ..
    },
    hover(props, monitor, component) {
        // ..
        if (!component) return null; //异常处理判断
        const dragIndex = monitor.getItem().id;//拖拽目标的Index
        const hoverIndex = props.meta.key; //放置目标Index
        if (dragIndex === hoverIndex) return null;// 如果拖拽目标和放置目标相同的话，停止执行

        props.moveTab(dragIndex, hoverIndex);
        // monitor.getItem().index = hoverIndex; //重新赋值index，否则会出现无限交换情况
    },
    canDrop(props, monitor) {
        // ..
    }
};
function targetCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        // You can ask the monitor about the current drag state:
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType(),
    }
}
let DesignTabbarItem = null;
if (__DESIGN__) {
    const defaultValue = {
        title: '',
        key: '',
    }
    const editor = [
        {
            type: 'Text',
            key: 'title',
            caption: '抬头',
        },
        {
            type: 'Text',
            key: 'key',
            caption: '标识',
        }
    ]
    const designable = require('yes-designer/utils/designable').default;
    @DropTarget('tabs', targetSpec, targetCollect)
    @DragSource('tabs', sourceSpec, collect)
    @designable(defaultValue, editor)
    @observer
    class DesignTabbarItemTmp extends Component {
        @observable meta = this.props.meta;
        componentDidMount() {
            const { connectDragPreview } = this.props;

            // Use empty image as a drag preview so browsers don't draw it
            // and we can draw whatever we want on the custom drag layer instead.
            this.drapPreview = connectDragPreview(getEmptyImage());
        }
        render() {
            const textStyle = {

            };
            if(this.props.active) {
                textStyle.color = 'red';
            }
            const { title, connectDragSource, connectDropTarget, connectDragPreview } = this.props;
            // connectDragPreview(<div>{this.meta.title}</div>);
            return connectDropTarget(connectDragSource(
                <div onClick={this.props.onPress} style={StyleSheet.flatten(styles.tabbarItem)}>
                    <Text style={textStyle}>{this.meta.title}</Text>
                </div>,
                { dropEffect: 'copy' }
            ));
        }
    }
    DesignTabbarItem = DesignTabbarItemTmp;
}

@observer
class TabViewTemplate extends TabView {
    static contextTypes = {
        isDesignMode: PropTypes.func,
    }

    constructor(...args) {
        super(...args);
        if (__DESIGN__) {
            /**
             * 设计模式下，整个Tabbar都重做
             */
            this.renderHeader = (props) => {
                return (
                    <DndProvider backend={HTML5Backend}>
                        <View style={styles.tabBar}>
                            {
                                // props.navigationState.routes.map((route, i) => {
                                this.meta.map((route, i) => {
                                    return <DesignTabbarItem 
                                                active={i===props.navigationState.index} 
                                                key={route.key} 
                                                removeable
                                                onPress = {()=>this.handleChangeTab(i)}
                                                onRemove = {()=>this.removeTab(i)}
                                                moveTab={this.moveTab} 
                                                debugStyle={{ flex: 1 }} 
                                                meta={route} />;
                                })
                            }
                            {
                                <TouchableOpacity onPress={this.addTab} style={styles.button}>
                                    {/* <View style={styles.button}> */}
                                    <Text>新增</Text>
                                    {/* </View> */}
                                </TouchableOpacity>
                            }
                        </View>
                    </DndProvider>
                )
            }
        }
    }

    @action
    moveTab = (from, to) => {//交换from和to
        console.log(`change ${from}<->${to}`);
        const fromIndex = this.meta.findIndex((item) => item.key === from);
        const toIndex = this.meta.findIndex((item) => item.key === to);
        if (fromIndex < 0 || toIndex < 0) {
            return;
        }
        const fromItem = this.meta[fromIndex];
        const toItem = this.meta[toIndex];
        this.meta[toIndex] = null;
        this.meta[fromIndex] = toItem;
        this.meta[toIndex] = fromItem;
    }

    formatMessage = (msg) => {
        return this.props.formatMessage ? this.props.formatMessage(msg) : msg;
    }

    buildRoutes = () => {
        if (__DESIGN__) {
            if (this.meta.length === 0) {
                this.meta.push({
                    title: '页面' + this.meta.length,
                    key: uuidv4(),
                    content: {
                        isGroup: true,
                        hideTitle: true,
                        items: [],
                    }
                });
            }
        }
        return this.props.meta;
    }

    @observable meta = this.props.meta;

    state = {
        index: 0,
        routes: this.buildRoutes(this.meta),
        loading: false,
    }

    addTab = () => {
        this.meta.push({
            title: '页面' + this.meta.length,
            key: uuidv4(),
            content: {
                isGroup: true,
                hideTitle: true,
                items: [],
            }
        });
        this.setState({
            routes: this.buildRoutes(this.meta),
        })
    }
    @action
    removeTab = (index) => {
        if(this.meta.length<=1) {
            alert('至少需要一个Tab页');
            return;
        }
        this.meta.splice(index, 1);
    }

    handleChangeTab = (index) => {
        // if (this.context.isDesignMode()) {
        //     //判断是不是点击了新增按钮页
        //     if (index === this.state.routes.length - 1) {
        //         this.addTab();
        //     }
        // }
        this.setState({
            index,
        });
    }

    componentWillMount() {//覆盖父类的代码

    }

    renderLabel = props => ({ route, index }) => {
        // const inputRange = props.navigationState.routes.map((x, i) => i);
        // const outputRange = inputRange.map(
        //     inputIndex => (inputIndex === index ? '#D6356C' : '#222'),
        // );
        // const color = props.position.interpolate({
        //     inputRange,
        //     outputRange,
        // });
        if (this.context.isDesignMode()) {//需要增加一個刪除的按鈕
            let title = route.title;
            if (route.key === 'new') {
                title = <AwesomeFontIcon name='plus' />;
                return (<Animated.Text style={[styles.label]}>
                    {title}
                </Animated.Text>);
            }
            return (
                <TabLabel designPositionBase debugStyle={{ alignSelf: 'stretch' }} meta={route} routes={this.state.routes} index={index} title={title} />
            )
        }
        return (
            <Animated.Text style={[styles.label]}>
                {route.title}
            </Animated.Text>
        );
    }

    renderScene = ({ route }) => { // eslint-disable-line react/prop-types
        if (!route.content) {
            return null;
        }
        return (
            <TabPanel meta={route.content} designStyle={{ flex: 1 }} designPositionBase />
        );
    }
}

const styles = StyleSheet.create({
    tabBar: {
        height: 40,
        flexDirection: 'row',
    },
    button: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 13,
        fontWeight: 'bold',
        margin: 8,
    },
    tabbarItem: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

// export default getMappedComponentHOC(TabViewTemplate);
export default internationalWrap(TabViewTemplate);
