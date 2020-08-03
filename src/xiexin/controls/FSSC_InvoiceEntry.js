import React, { PureComponent } from 'react';
import { Modal, NavBar, Icon } from 'antd-mobile';
import PropTypes from 'prop-types';
import GridView from '../../controls/GridView';
import { ComboBox, ListComponents } from 'yes-comp-react-native-web';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import GridSelect from '../../controls/GridSelect';
import SegementButtons from '../../controls/SegementButtons';
import CheckboxLabel from '../../controls/CheckboxLabel';
import FilterBlock from './FilterBlock';
import { BackHandler, Util } from 'yes-intf';
import Header from '../../controls/Header';
import SourceTypeIcon from './SourceTypeIcon';
import { ActionSheet } from 'antd-mobile';

const { ListImage } = ListComponents;

const styles = StyleSheet.create({
    label: {
        color: 'orangered',
        fontSize: 12,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 12,
    }
});
export default class InvoiceEntry extends PureComponent {
    static contextTypes = {
        getPicture: PropTypes.func,
        getBillForm: PropTypes.func,
        uploadImage: PropTypes.func,
        onValueChange: PropTypes.func,
        onControlClick: PropTypes.func,
        getContextComponent: PropTypes.func,
    }
    state = {
        step: 1,
        modalVisible: true,
        selectType: null,
    }
    componentWillUnmount() {
        this.backHandler && this.backHandler();
    }
    stepBack = () => {
        this.backHandler && this.backHandler();
        this.setState({
            step: 1,
            modalVisible: true,
        });
    }
    onClose = () => {
        this.props.onClose && this.props.onClose();
    }
    onCancel = () => {
        this.props.onClose && this.props.onClose();
    }
    onSelectTypeChange = async (yigoid, v) => {
        this.backHandler && this.backHandler();
        this.backHandler = BackHandler.addPreEventListener(() => {
            this.stepBack();
            this.backHandler =null;
        });
        this.setState({
            selectType: v,
        })
        if (v == 2) {//picture
            const billform = this.context.getBillForm();
            if (!billform) {
                return;
            }
            const formKey = billform.form.formKey;
            const oid = billform.form.getOID();
            this.setState({
                modalVisible: false,
            });
            let file = null;
            try {
                file = await this.context.getPicture(0, 60, 1000);
            } catch (ex) {
                if (ex !== 'usercancel') {
                    Util.alert('错误', ex.messsage);
                }
                this.setState({
                    step: 1,
                    modalVisible: true,
                });
                return;
            }
            // const file = await this.context.getPicture(0, 60, 1000);
            Util.safeExec(async () => {
                try {
                    const result = await this.context.uploadImage(formKey, oid, file.file, file.name);
                    this.setState({
                        step: 2,
                    });
                    await this.context.onValueChange("HeadPath", result);
                    await this.context.onControlClick("InvoiceIndentity");
                } catch (ex) {
                    Util.alert('错误', ex.messsage);
                    this.setState({
                        step: 1,
                        modalVisible: true,
                    });
                }
            })
        }
        if (v == 3) {//import from database
            this.setState({
                modalVisible: false,
                step: 2,
            });
            //这里需要判断当前的InvoiceType是否为空
            const invoiceType = this.context.getContextComponent('FeeTypeID_NODB4Other');
            if(invoiceType) {
                if(!invoiceType.isNull()) {
                    await this.context.onControlClick("Query");
                }
            }
            // await this.context.onControlClick("Query");
        }
        if (v == 1) {//manual input`
            this.setState({
                modalVisible: true,
                step: 3,
            });
        }
    }
    onInvoiceTypeChange = (yigoid, v) => {
        this.setState({
            modalVisible: false,
            step: 1,
        });
    }
    render() {
        const { formStatus, errorMsg } = this.props;
        // if(formStatus==='error') {
        //     return null;
        // }
        if (this.state.step === 1) {
            return (<Modal
                visible={this.state.modalVisible}
                popup={true}
                animationType={'slide-up'}
                transparent
                maskClosable={true}
                onClose={this.onClose}
                title="发票来源"
                footer={[{
                    text: '取消',
                    onPress: this.onCancel,
                }]}
            // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            // afterClose={this.onClose}
            >
                {formStatus === 'ok' ?
                    <ComboBox
                        yigoid="SelectType_NODB4Other"
                        inline
                        imgElement={<SourceTypeIcon style={{ paddingRight: 8 }} />}
                        onChange={this.onSelectTypeChange}
                        hideSelect
                        itemStyle={{
                            height: 45,
                            borderBottomWidth: 1,
                            borderBottomColor: 'lightgrey',
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    /> : (formStatus==='error'? <View><Text>{errorMsg.message}</Text></View>: <ActivityIndicator size="large" />)}
            </Modal>);
        }
        if (this.state.step === 2) {//需要显示一个发票列表
            return (
                <Modal
                    visible={true}
                    // transparent
                    // popup
                    maskStyle={{ zIndex: 899 }}
                    wrapClassName="fullscreen"
                    maskClosable={false}
                >
                    <View style={{ flex: 1 }}>
                        <Header
                            canBack={true}
                            title={"发票列表"}
                            backHandler={this.stepBack}
                        />
                        <FilterBlock
                            queryButton={this.state.selectType == "3" ? "Query" : null}
                            filterItems={[{
                                type: 'element',
                                elementType: 'ChainDict',
                                elementProps: {
                                    yigoid: 'FeeTypeID_NODB4Other',
                                    layoutStyles: {
                                        paddingRight: 12,
                                        paddingleft: 12,
                                        height: 32,
                                    },
                                    textStyles: {
                                        justifyContent: 'flex-end',
                                    }
                                }
                            }]}
                        ></FilterBlock>
                        <GridView
                            style={{ flex: 1, marginLeft: 12, marginRight: 12 }}
                            yigoid="Grid1"
                            clickMode="select"
                            hideAction={true}
                            primaryKey={"cell1"}
                            secondKey={["cell4"]}
                            tertiaryKey={["cell2",
                                "cell8",
                                <CheckboxLabel style={styles.label} falseLabel="费用类型不符" yigoid="IsCompliance" />,
                                <CheckboxLabel style={styles.label} trueLabel="已引用" yigoid="IsUsed" />,
                            ]}
                            rightElement={<ListImage yigoid="cell7" containerStyle={{ justifyContent: 'center' }} style={{ width: 60, height: 40 }} />}
                            showArrow={false}
                            leftElement={
                                <GridSelect yigoid="select" />
                            }
                        />
                        <SegementButtons items={[{
                            text: '导入发票',
                            key: 'OK',
                        }, {
                            text: '新建账本',
                            key: 'NewBooks'
                        }, {
                            text: '取消',
                            key: 'Close',
                        }]} />
                    </View>
                </Modal>);
        }
        if (this.state.step == 3) {
            return (<Modal
                visible={this.state.modalVisible}
                popup={true}
                animationType={'slide-up'}
                transparent
                maskClosable={false}
                // onClose={this.onClose}
                title="提示信息"
                footer={[{
                    text: '取消',
                    onPress: this.onCancel,
                }]}
                // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                afterClose={this.onClose}
            >
                <View>
                    <Text>暂不支持</Text>
                </View>
                {/* <ComboBox
                    yigoid="InvoiceType_NODB4Other"
                    inline
                    onChange={this.onInvoiceTypeChange}
                    itemStyle={{
                        height: 45,
                        borderBottomWidth: 1,
                        borderBottomColor: 'lightgrey',
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                /> */}
            </Modal>);
        }
        return null;
    }
}

