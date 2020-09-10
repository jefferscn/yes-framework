import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';

export default class AutofitScrollView extends PureComponent {
    onLayout = (e) => {
        if(!document.activeElement || !this.scrollNode) {
            return;
        }
        if(!this.scrollNode.contains(document.activeElement)) {
            return;
        }
        const scrollRect = this.scrollNode.getBoundingClientRect();
        const inputRect = document.activeElement.getBoundingClientRect();
        const scrollTop = this.scrollNode.scrollTop;
        if(scrollRect.top > inputRect.top) {//在可视范围的上方，需要向下滚动一下
            this.scrollNode.scrollTop = scrollTop - scrollRect.top + inputRect.top; 
            return;
        }
        if(scrollRect.top + scrollRect.height < inputRect.top) {
            this.scrollNode.scrollTop = inputRect.height + scrollTop + inputRect.top - scrollRect.top - scrollRect.height;
            return;
        }
    }
    ref = (ref)=> {
        this.scrollRef = ref;
        if(!ref) {
            this.scrollNode= null;
            return;
        }
        this.scrollNode = this.scrollRef.getScrollableNode()
    }
    render() {
        const { children } = this.props;
        return (
            <ScrollView ref={this.ref} onLayout={this.onLayout}>
                {
                    children
                }
            </ScrollView>
        )
    }
}