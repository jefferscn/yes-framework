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
        getTotalRowCount = ()=> {
            const owner = this.context.getOwner();
            if (!owner) {
                return 0;
            }
            return owner.getTotalRowCount();
        }
        getTotal = (sumField) => {
            const owner = this.context.getOwner();
            if (!owner || !sumField) {
                return 0;
            }
            // const index = owner.getCellIndexByKey(sumField);
            let total = new Decimal(0);
            for (let i = 0; i < this.props.data.size; i++) {
                let v = owner.getValueByKey(i, sumField);
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
            const total = this.getTotal(this.props.sumField);
            const selectedCount = this.getSelectedCount();
            const totalRowCount = this.getTotalRowCount();
            return (
                <Comp {...this.props}  
                    count={count}
                    total={total}
                    getTotal={this.getTotal}
                    totalRowCount={totalRowCount}
                    selectedCount={selectedCount}
                />
            )
        }
    }
    return GridTotal;
}
