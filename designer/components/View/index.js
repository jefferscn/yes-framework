import React,{ PureComponent } from 'react'
// import { flex, flexDirectionRow, flexDirectionCol } from '../../styles';

const styles = {
    default: {
        display: 'flex',
        flexDirection: 'column',
    }
}
export default class View extends PureComponent {
    addEventListener=(event, fn)=> {
        this.ref.addEventListener(event, fn);
    }
    removeEventListener=(event)=> {
        this.ref.removeEventListener(event);
    }
    render() {
        let {style, mouseEnterOrLeave, ...others} = this.props;
        const ss = Object.assign({}, styles.default, style);
        return <div style={ss}
                    ref={(ref)=>this.ref = ref}
                    onMouseEnter={(e) => {
                        if (mouseEnterOrLeave != null)
                            mouseEnterOrLeave(e, true)
                    }}
                    onMouseLeave={(e) => {
                        if (mouseEnterOrLeave != null)
                            mouseEnterOrLeave(e, false)
                    }}
                    {...others}>
            {this.props.children}
        </div>
    }
}
