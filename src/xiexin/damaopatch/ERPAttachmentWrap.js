import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Svr, YIUI, View, DataDef, getUserInfo } from 'yes-core';

export default (AttachmentComp) => {
    class WrappedAttachmentComp extends PureComponent {
        static defaultProps = {

        }

        static contextTypes = {
            getContextComponent: PropTypes.func,
            getBillForm: PropTypes.func,
        }
        mergeData(src, tgt) {
            const f = this.context.getBillForm();
            if (!f) {
                return;
            }
            const doc = f.form.getDocument();
            const table = doc.getByKey(this.props.tableKey);
            let colInfo;
            let value;

            const needMerge = function (field) {
                if (tgt.tableMode === YIUI.TableMode.DETAIL) {
                    return YIUI.SystemField.isSystemField(field);
                }
                return YIUI.Attachment_Data.isAttachmentField(field);
            };

            for (let i = 0, size = table.cols.length; i < size; i++) {
                colInfo = table.getCol(i);

                if (!colInfo.key || !needMerge(colInfo.key)) {
                    continue;
                }

                value = src.getByKey(colInfo.key);
                tgt.setByKey(colInfo.key, value === undefined ? null : value);
            }
        }

        addAttachment = async (file, callBack) => {
            const form = this.context.getBillForm().form;
            const doc = form.getDocument();
            const table = doc.getByKey(this.props.tableKey);
            const parentTable = doc.getByKey(table.parentKey);
            const poid = parentTable ? parentTable.getByKey(YIUI.SystemField.OID_SYS_KEY) : -1;
            const options = {
                service: 'UploadAttachment',
                fileName: file.name,
                formKey: form.formKey,
                operatorID: getUserInfo().id,
                fileID: -1,
                poid: poid == null ? -1 : poid,
                quickSave: true,
                oid: form.getOID(),
                tableKey: this.props.tableKey,
                provider: '',
                path: '',
                seriesPath: '',
                mode: 2,
            };
            const result = await Svr.Request.upload(file, options);
            const { isERPAttachment = false } = this.props;
            if (isERPAttachment) {
                const fileOID = result.getByKey(YIUI.SystemField.OID_SYS_KEY)
                if (!fileOID || fileOID <= 0) {
                    return;
                }
                const ERP_Attachment_CALLBACK = `DBUpdate('update SCM_AttachMent set PBillID='&GetPara('PBILLID')&",TblName='"& GetPara("TBLNAME") &"' where OID=${fileOID}")`;
                await form.eval(ERP_Attachment_CALLBACK, new View.Context(form));
            }
            // if (grid && refresh && row) {
            // if (!this.props.oid) {
            table.addRow(true);
            // }
            // if (YIUI.GridUtil.isEmptyRow(row)) {
            //     table.addRow(true);
            //     var viewRow = new YIUI.DetailRowBkmk();
            //     viewRow.setBookmark(table.getBkmk());
            //     row.bkmkRow = viewRow;
            // }
            // table.setByBkmk(row.bkmkRow.getBookmark());

            this.mergeData(result, table);

            // if (quickSave)
            table.setState(DataDef.R_Normal);

            const grid = this.context.getContextComponent(this.props.yigoid);
            const detailMetaRow = grid.getDetailRow();
            const group = grid.dataModel.rootBkmk.getRowAt(0);
            const detailGridRow = new YIUI.DetailRowBkmk();
            detailGridRow.setBookmark(table.getBkmk());
            group.addRow(detailGridRow);
            const newRowIndex = YIUI.GridUtil.insertRow(grid, -1, detailMetaRow, detailGridRow, group);
            YIUI.GridHandler.showDetailRowData(form, grid, newRowIndex);
            await form.getUIProcess().doPostInsertRow(grid, newRowIndex, false);
            // grid.showDetailRow(newRowIndex);
            // if (parentTable)
            //     table.setParentBkmk(parentTable.getBkmk());
            // }
        }
        render() {
            return (
                <AttachmentComp
                    addAttachment={this.addAttachment}
                    {...this.props}
                />
            );
        }
    }
    return WrappedAttachmentComp;
};
