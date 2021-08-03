/*
 * @Author: gmf
 * @Date:   2016-03-17 09:22:11
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-09 09:03:20
 */
import React, { PureComponent } from 'react';
import { MetaBillFormWrap } from 'yes-intf';
import Element from '../../template/Element';
/**
 * 添加High Order Component
 * 主要为了包装常用的Attribute： visibale editable等
 *
 */
class VisibleFormEditable extends PureComponent {
    render() {
        const { billform, children, element } = this.props;
        if(billform) {
            const formStatus = billform.form.getOperationState();
            if(formStatus ===1 || formStatus===2) {
                return children || <Element meta={element} />
            }
        }
        return null;
    }
}

export default MetaBillFormWrap(VisibleFormEditable);
