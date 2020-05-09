import React, { PureComponent } from 'react';
import defaultTemplateMapping from '../defaultTemplateMapping';
import { View, Text as RawText, StyleSheet, InteractionManager } from 'react-native';
import { AppDispatcher, Util, DynamicControl } from 'yes';
import Controls from '../../config/control';
// import { withNavigation } from 'react-navigation';
import { internationalWrap } from 'yes-intf';
import PropTypes from 'prop-types';
import { CustomBillForm } from 'yes-comp-react-native-web';
// import { intlShape, FormattedMessage } from 'react-intl';

const { Searchbar } = Controls;

class ListTemplate extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
        getControlProps: PropTypes.func,
    }

    onRefresh = () => {
        AppDispatcher.dispatch({
            type: 'RELOADFORM',
            key: Util.buildFormKey(this.props.formKey, '-1'),
        });
    }

    render() {
        return this.buildChildren();
    }

    buildChildren() {
        const { searchBar, filterBlock, list, head } = this.props;
        // const header = this.context.createElement(head);
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {
                    this.context.createElement(head)
                }
                {
                    filterBlock? this.context.createElement(filterBlock) : null
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
const ListWithNavigation = internationalWrap(ListTemplate);

ListWithNavigation.caption = "单据列表模板";
defaultTemplateMapping.reg('list', ListWithNavigation);
export default ListWithNavigation;
