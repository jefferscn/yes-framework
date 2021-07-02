import React, { PureComponent } from 'react';
import { OperationWrap } from 'yes-intf';

class OperationExecTimer extends PureComponent {
    timerExec = ()=> {
        if(this.props.controlState) {
            const items = this.props.controlState.get('items');
            const opt = items.find((item)=> item.get('key')===this.props.yigoid);
            if(opt) {
                const action = opt.get('action');
                if(action) {
                    this.props.onClick(action);
                }
            }
        }
    }
    componentDidMount() {
        const { ticks } = this.props;
        this.timer = setInterval(this.timerExec, ticks);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    render() {
        return null;
    }
}

export default OperationWrap(OperationExecTimer);
