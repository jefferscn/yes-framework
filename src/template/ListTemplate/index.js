import React, { PureComponent } from 'react';
import { Components } from 'yes-platform';
import defaultTemplateMapping from '../defaultTemplateMapping';
import LeftIcon from '../../controls/LeftIcon';
import ListView from '../../controls/ListView';
import DateText from './DateText';
import { View, Text as RawText, StyleSheet, InteractionManager } from 'react-native';
import { AppDispatcher, Util, DynamicControl } from 'yes';
import PureUserName from '../../controls/PureUserName';
import TimeSpan from '../../controls/TimeSpan';
import Searchbar from '../../controls/Searchbar';
import NodeText from '../../controls/NodeText';
import { withNavigation } from 'react-navigation';
import internationalWrap from '../../controls/InternationalWrap';

const {
    DynamicBillForm,
    BillForm,
    Text,
} = Components;

const styles = StyleSheet.create({
    listView: {

    },
    primaryTextLayout: {
        justifyContent: 'flex-start',
    },
    primaryContainer: {
        flexDirection: 'row',
        lineHeight: 24,
        paddingBottom: 6,
    },
    primaryText: {
        fontSize: 17,
        whiteSpace: 'pre',
    },
    secondaryContainer: {
        flexDirection: 'row',
        lineHeight: 14,
        paddingBottom: 6,
    },
    secondaryText: {
        fontSize: 13,
        color: 'rgba(0,0,0,0.5)',
    },
});
class ListTemplate extends PureComponent {
    onRefresh = () => {
        AppDispatcher.dispatch({
            type: 'RELOADFORM',
            key: Util.buildFormKey(this.props.formKey, '-1'),
        });
    }
    state = {
        ready: false,
    }

    componentDidMount() {
        // window.requestIdleCallback(() => {
        //     this.setState({ ready: true });
        // });
        this.props.navigation.addListener(
            'didFocus',
            () => {
                this.setState({
                    ready: true,
                });
            }
            // this._focusFirstTextInput
        );
    }

    render() {
        if (!this.state.ready) {
            return null;
        }
        return (
            <DynamicBillForm
                formKey={this.props.formKey}
                oid={-1}
                status={'EDIT'}
            >
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <Searchbar yigoid="InstanceID_Cond" textField="InstanceID_Cond" searchButton="Button1" placeholder={this.props.formatMessage('search taskid')} />
                    <ListView
                        yigoid="list"
                        rowStyle={{
                            height: 110,
                            paddingTop: 12,
                            paddingBottom: 12,
                            borderBottom: '1px solid #ddd',
                        }}
                        onRefresh={this.onRefresh}
                        style={{ flex: 1, marginLeft: 12, backgroundColor: 'white' }}
                        isCustomLayout
                        primaryKey={<View style={styles.primaryContainer}>
                            <PureUserName isCustomLayout textStyles={styles.primaryText} yigoid="displayname" />
                            <RawText style={styles.primaryText}>{this.props.formatMessage('的')}</RawText>
                            <Text isCustomLayout layoutStyles={styles.primaryTextLayout} textStyles={styles.primaryText} yigoid="FormKeyID" /></View>}
                        // style={{
                        //     primaryText: {
                        //         fontSize: 14,
                        //         whiteSpace: 'nowrap',
                        //     },
                        //     secondaryText: {
                        //         fontSize: 12,
                        //         whiteSpace: 'nowrap',
                        //     },
                        //     tertiaryText: {
                        //         fontSize: 12,
                        //     },
                        // }}
                        secondKey={[<View style={styles.secondaryContainer}>
                            <RawText style={styles.secondaryText}>{this.props.formatMessage('Node')} : </RawText>
                            <NodeText isCustomeLayout textStyles={styles.secondaryText} yigoid="WorkitemName" />
                        </View>]}
                        tertiaryKey={[<View><View style={styles.secondaryContainer}>
                            <RawText style={styles.secondaryText}>{this.props.formatMessage('Task Id')} : </RawText>
                            <Text isCustomeLayout textStyles={styles.secondaryText} yigoid='InstanceID' />
                        </View>
                            <TimeSpan textStyles={styles.secondaryText} yigoid="creattime" />
                        </View>]}
                        leftElement={<LeftIcon yigoid="ProcessKey" />}
                        rightElement={<DateText yigoid="creattime" />}
                    />
                </View>
            </DynamicBillForm>
        );
    }
}
const ListWithNavigation = withNavigation(internationalWrap(ListTemplate));
defaultTemplateMapping.reg('list', ListWithNavigation);
export default ListWithNavigation;
