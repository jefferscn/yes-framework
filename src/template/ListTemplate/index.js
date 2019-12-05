import React, { Component } from 'react';
import defaultTemplateMapping from '../defaultTemplateMapping';
import { View, Text as RawText, StyleSheet, InteractionManager } from 'react-native';
import { AppDispatcher, Util, DynamicControl } from 'yes';
import Controls from '../../config/control';
import { withNavigation } from 'react-navigation';
import internationalWrap from '../../controls/InternationalWrap';
import PropTypes from 'prop-types';
import { DynamicBillForm } from 'yes-platform';
import { intlShape, FormattedMessage } from 'react-intl';

const { Searchbar } = Controls;

class ListTemplate extends DynamicBillForm{
    static contextTypes = {
        createElement: PropTypes.func,
        getControlProps: PropTypes.func,
        intl: intlShape,
    }

    onRefresh = () => {
        AppDispatcher.dispatch({
            type: 'RELOADFORM',
            key: Util.buildFormKey(this.props.formKey, '-1'),
        });
    }

    buildChildren() {
        // if (!this.state.ready) {
        //     return null;
        // }
        const { searchBar, list, head } = this.props;
        // const header = this.context.createElement(head);
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {
                    this.context.createElement(head)
                }
                {
                    searchBar ? <Searchbar
                        visible
                        designPositionBase
                        meta={searchBar}
                        yigoid={searchBar.textField}
                        textField={searchBar.textField}
                        searchButton={searchBar.queryButton}
                        placeholder={this.props.formatMessage('search taskid')}
                    /> : null
                }
                <View style={{ flex: 1 }}>
                    <DynamicControl
                        designPositionBase
                        yigoid={list}
                        debugStyle={{ flex: 1 }}
                        layoutStyles={{ flex: 1 }}
                        style={{ flex: 1, marginLeft: 12 }}
                        {...this.context.getControlProps(list)}
                    />
                </View>
            </View>
        );
    }
}
const ListWithNavigation = withNavigation(internationalWrap(ListTemplate));

ListWithNavigation.caption = "单据列表模板";
defaultTemplateMapping.reg('list', ListWithNavigation);
export default ListWithNavigation;
