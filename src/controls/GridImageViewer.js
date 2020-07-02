import React, { PureComponent } from 'react';
import WxImageViewer from 'react-wx-images-viewer';
import { GridWrap } from 'yes-intf';

class GridImageViewer extends PureComponent {
    render() {
        const { data } = this.props;
        if (!data) {
            return null;
        }
        return (<WxImageViewer
            onClose={this.viewerClose}
            zIndex={1000}
            urls={[displayValue]}
            index={0} />);
    }
}

export default GridWrap(GridImageViewer);