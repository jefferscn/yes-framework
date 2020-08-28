import React, { PureComponent } from 'react';
import { ListView } from 'antd-mobile';
import { View, ActivityIndicator, StyleSheet, Text as RawText, TouchableWithoutFeedback } from 'react-native';
import { GridRowWrap, GridWrap, notEmptyVisibleWrapper } from 'yes';
// import styles from 'yes-framework/style';
import { TextArea, ListComponents } from 'yes-comp-react-native-web';
// import TextArea from './TextArea';
import SplitText from 'yes-framework/controls/SplitText';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import Avator from './Avator';

const { ListText } = ListComponents;

const styles = StyleSheet.create({
    ListItemContainer: {
        flexDirection: 'row',
        // height: 60,
        paddingTop: 16,
        paddingBottom: 16,
        alignItems: 'flex-start',
    },
    avatorContainer: {
        height: 40,
    },
    alignCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    operatorLayout: {
        paddingLeft: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 11,
        color: '#000000',
        paddingLeft: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text1: {
        fontSize: 11,
        color: '#000000',
        paddingLeft: 5,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textLayout: {
        justifyContent: 'flex-start',
    },
    transfertype: {
        flexGrow: 0,
        padding: 2,
        backgroundColor: '#f76e48',
    },
    colorOrange: {
        color: '#f76e48',
    },
    transferContainer: {
        paddingTop: 10,
        paddingLeft: 15,
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 5,
    },
    time: {
        color: '#B2B2B2',
        fontSize: 10,
        textAlign: 'right',
        flex:1,
    },
    linkup: {
        position: 'absolute',
        width: 1,
        height: 16,
        left: 25,
        top: 0,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'lightgray',
    },
    linkdown: {
        position: 'absolute',
        width: 1,
        left: 25,
        top: 64,
        bottom: 0,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'lightgray',
    },
    firstline: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 5,
    },
    workitem: {
        justifyContent: 'left',
        paddingLeft: 15,
        fontWeight: 'bold',
    },
    arrow: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        width: 20,
        color: 'rgba(0,0,0,0.6)',
    },
});
const NewIcon = notEmptyVisibleWrapper(Icon);
const NewTextArea = notEmptyVisibleWrapper(TextArea);

class WorkflowListItem extends PureComponent {
    static contextTypes = {
        getContextComponentState: PropTypes.func,
    }
    state = {
        showCommet: true,
    }
    toggleCommet = () => {
        this.setState({
            showCommet: !this.state.showCommet,
        });
    }
    render() {
        const { operatorField, workItemNameField, auditResultField, finishTimeField, commentField } = this.props;
        return (
            <TouchableWithoutFeedback style={styles.ListItemContainer} onPress={this.toggleCommet}>
                <View style={styles.ListItemContainer} >
                    <View style={styles.avatorContainer}>
                        <Avator yigoid={operatorField} size={50} mode="operator" />
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <View style={styles.firstline}>
                            <ListText style={styles.workitem} yigoid={workItemNameField}/>
                            <NewIcon relatedId={commentField} style={[styles.arrow, this.state.showCommet?null:styles.colorOrange]} name={'commenting'} />
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, paddingBottom: 5}}>
                            <SplitText style={[styles.text, styles.operatorLayout]}  yigoid={operatorField} />
                            {this.props.rowIndex === 0 ? <RawText style={styles.text}>发起申请</RawText> : <ListText layoutStyles={styles.textLayout} style={styles.text1} yigoid={auditResultField} />}
                            <ListText style={styles.time} yigoid={finishTimeField} />
                        </View>
                        {this.state.showCommet ? <NewTextArea autoHeight textStyles={{fontSize: 14,backgroundColor:'lightgray'}} relatedId={commentField} yigoid={commentField} /> : null}
                    </View>
                    {this.props.rowIndex === 0 ? null : <View style={styles.linkdown} />}
                    {this.props.rowIndex < this.props.size - 1 ? <View style={styles.linkup} /> : null}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

class WorkflowList extends PureComponent {
    static defaultProps = {
        operatorField: 'l_operatorID',
        workItemNameField: 'l_workItemName',
        commentField: 'l_userInfo',
        finishTimeField: 'l_finishTime',
        auditResultField: 'l_auditResult',
    }
    componentWillReceiveProps(nextProps) {
        const data = nextProps.data;
        if (data) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(data, this.generateRowIdentifier(nextProps)),
            });
        }
    }

    componentWillMount() {
        if (this.props.data) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.props.data,
                    this.generateRowIdentifier(this.props)),
            });
        }
    }

    generateRowIdentifier = (props) => {
        const data = props.data;
        const result = [];
        for (let i = 0; i < data.size; i++) {
            result.push(i);
        }
        return result;
    }

    state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
            getRowData: (dataBlob, sectionIndex, rowIndex) => {
                return dataBlob[sectionIndex].get(rowIndex);
            },
        }),
    }

    NewListItem = GridRowWrap(WorkflowListItem, this.props.yigoid)

    renderItem = (item, secionId, rowId, highlightRow) => {
        const NewListItem = this.NewListItem;
        let show = true;
        const revertIndex = this.props.data.size - rowId - 1;
        // const itm = this.props.controlState.get('data').get(revertIndex);
        // if (itm) {
        //     const auditResult = itm.get('Audit_Result');
        //     // const workitemId = itm.get('workItemID');
        //     show = !(auditResult === '25' || auditResult === '24' || auditResult === '26' || auditResult === null);
        // }
        return show ?
            <NewListItem
                size={this.props.data.size}
                rowIndex={revertIndex}
                operatorField={this.props.operatorField}
                workItemNameField={this.props.workItemNameField}
                commentField= {this.props.commentField}
                finishTimeField={this.props.finishTimeField}
                auditResultField= {this.props.auditResultField}
            /> : null;
    }

    render() {
        const { controlState, layoutStyles, style } = this.props;
        if (controlState && controlState.get('isVirtual')) {
            return (
                <View style={[layoutStyles]}>
                    <ActivityIndicator size="large" color="cadetblue" />
                </View>
            );
        }
        const rowCount = this.state.dataSource.getRowCount();
        if(rowCount ===0) {
            return (<View style={[layoutStyles]}>
                    <RawText>没有审批信息</RawText>
                </View>);
        }
        return (
            <ListView
                initialListSize={20}
                style={style}
                contentContainerStyle={{ width: '100%', position: 'relative' }}
                dataSource={this.state.dataSource}
                renderRow={this.renderItem}
                pageSize={4}
            />
        );
    }
}

export default GridWrap(WorkflowList);
