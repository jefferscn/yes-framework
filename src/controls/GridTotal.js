import React, { PureComponent } from 'react';
import { GridWrap } from 'yes-intf';
import PropTypes from 'prop-types';
import Decimal from 'decimal.js';

export default (Comp) => {
    @GridWrap
    class GridTotal extends PureComponent {
        static contextTypes = {
            getOwner: PropTypes.func,
        }
        getRowCount = () => {
            return this.props.data ? this.props.data.size : 0;
        }
        getTotal = () => {
            const { sumField } = this.props;
            const owner = this.context.getOwner();
            if (!owner) {
                return 0;
            }
            const index = owner.getCellIndexByKey(sumField);
            let total = new Decimal(0);
            for (let i = 0; i < this.props.data.size; i++) {
                let v = owner.getValueAt(i, index);
                total = total.plus(v || 0);
            }
            return parseFloat(total);
        }
        getSelectedCount = ()=> {
            const owner = this.context.getOwner();
            if (!owner) {
                return 0;
            }
            if(owner.selectFieldIndex<0) {
                return 0;
            }
            let total = 0;
            for (let i = 0; i < this.props.data.size; i++) {
                let v = owner.getValueAt(i, owner.selectFieldIndex);
                if(v) {
                    total++;
                }
            }
            return total;
        }
        render() {
            const count = this.getRowCount();
            const total = this.getTotal();
            const selectedCount = this.getSelectedCount();
            return (
                <Comp {...this.props}  
                    count={count}
                    total={total}
                    selectedCount={selectedCount}
                />
            )
        }
    }
    return GridTotal;
}
