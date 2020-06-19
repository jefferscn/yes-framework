import React, { PureComponent } from 'react';
import defaultTemplateMapping from '../defaultTemplateMapping';
import { View, Text as RawText, StyleSheet, InteractionManager } from 'react-native';
import { AppDispatcher, Util, DynamicControl } from 'yes';
import Controls from '../../config/control';
// import { withNavigation } from 'react-navigation';
import { internationalWrap } from 'yes-intf';
import PropTypes from 'prop-types';
// import { intlShape, FormattedMessage } from 'react-intl';

const { Searchbar } = Controls;

class ListTemplate extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
        onControlClick: PropTypes.func,
        getControlProps: PropTypes.func,
    }

    state = {
        refreshing: false,
    }
    onRefresh = async () => {
        this.setState({
            refreshing: true,
        });
        try {
            const { refresh } = this.props;
            if (!refresh || refresh.type === 'form') {
                await this.props.reload();
            }
            if(refresh && refresh.type==='button') {
                await this.context.onControlClick(refresh.buttonId);
            }
        } catch (ex) {
            console.log(ex);
        } finally {
            this.setState({
                refreshing: false,
            })
        }
        // AppDispatcher.dispatch({
        //     type: 'RELOADFORM',
        //     key: Util.buildFormKey(this.props.formKey, '-1'),
        // });
    }

    render() {
        return this.buildChildren();
    }

    buildChildren() {
        const { searchBar, filterBlock, list, head, action, formStatus, error, errorMsg } = this.props;
        //reloading状态下不显示加载状态
        // if(formStatus!=='ok' || formStatus!=='reloading') {
        //     return (

        //     )
        // }
        let listEle = this.context.createElement(list, {
            onRefresh: this.onRefresh,
            refreshing: this.state.refreshing,
        });
        let actionButton = this.context.createElement(action);
        if (!React.isValidElement(listEle)) {
            listEle = <DynamicControl
                designPositionBase
                yigoid={list}
                debugStyle={{ flex: 1 }}
                layoutStyles={{ flex: 1 }}
                style={{ flex: 1, marginLeft: 12 }}
                {...this.context.getControlProps(list)}
            />;
            listEle = this.context.createElement(list);
        }
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {
                    this.context.createElement(head)
                }
                {
                    filterBlock ? this.context.createElement(filterBlock, { formStatus }) : null
                }
                <View style={{ flex: 1 }}>
                    {listEle}
                </View>
                {
                    actionButton
                }
            </View>
        );
    }
}
const ListWithNavigation = internationalWrap(ListTemplate);

ListWithNavigation.caption = "单据列表模板";
defaultTemplateMapping.reg('list', ListWithNavigation);
export default ListWithNavigation;
