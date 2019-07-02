/**
 * 一个支持主文字，副文字以及右边有一个链接标志的列表
 *
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListView, PullToRefresh } from 'antd-mobile';
import { View, ActivityIndicator } from 'react-native';
import { propTypes } from 'yes'; // eslint-disable-line
import { GridRowWrap as gridRowWrap, DynamicControl, GridWrap } from 'yes';
// import styles from '../../style';
import AwesomeFontIcon from 'react-native-vector-icons/FontAwesome';
import ListViewItem from '../CellLayoutItem';
import designable from '../../../designer/utils/designable';

@GridWrap
class AntdListView extends PureComponent {
    static propTypes = {
        yigoid: PropTypes.string,
        primaryKey: PropTypes.string,
        secondKey: PropTypes.string,
        tertiaryKey: PropTypes.string,
        divider: PropTypes.bool,
        showArrow: PropTypes.bool,
    };
    // static contextTypes = {
    //     uiTheme: PropTypes.object.isRequired,
    // };
    static defaultProps = {
        // ...ImmutableVirtulized.defaultProps,
        style: {},
        showArrow: true,
        divider: true,
    };

    componentWillReceiveProps(nextProps) {
        const data = nextProps.controlState.getIn(['dataModel', 'data']);
        if (data) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.controlState.getIn(['dataModel', 'data']), this.generateRowIdentifier(nextProps)),
            });
        }
    }

    componentWillMount() {
        if (this.props.controlState && this.props.controlState.getIn(['dataModel', 'data'])) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.props.controlState.getIn(['dataModel', 'data']),
                    this.generateRowIdentifier(this.props)),
            });
        }
    }

    generateRowIdentifier = (props) => {
        const data = props.controlState.getIn(['dataModel', 'data']);
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

    onClick = (rowIndex) => {
        if (this.props.onClick) {
            this.props.onClick(rowIndex);
        }
    }

    NewListItem = gridRowWrap(ListViewItem, ActivityIndicator, this.props.yigoid)
    // RowView = listRowWrap(View, this.props.yigoid)
    renderItem = (item, secionId, rowId, highlightRow) => {
        const NewListItem = this.NewListItem;
        return (
            <NewListItem
                content={this.props.content}
                actions={this.props.actions}
                onPress={() => this.onClick(rowId)}
                rowIndex={rowId}
            />
        );
    }

    renderSeparator = (sectionID, rowID) => (
        <div
            key={`${sectionID}-${rowID}`}
            style={{
                backgroundColor: '#F5F5F9',
                height: 8,
                borderTop: '1px solid #ECECED',
                borderBottom: '1px solid #ECECED',
            }}
        />
    );
    onRefresh = () => {
        this.props.onRefresh && this.props.onRefresh();
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
        return (
            <ListView
                style={style}
                initialListSize={20}
                dataSource={this.state.dataSource}
                contentContainerStyle={{ width: '100%' }}
                renderRow={this.renderItem}
                renderSeparator={this.renderSeparator}
                pageSize={4}
                pullToRefresh={this.props.onRefresh ? <PullToRefresh
                    refreshing={false}
                    onRefresh={this.onRefresh}
                /> : null}
            />
        );
    }
}
AntdListView.propTypes = propTypes.List;

let result = AntdListView;

if (__DESIGN__) {
    const editor = {

    };
    const defaultValue = {
        content: {
            isGroup: true,
            hideTitle: true,
            items: [],
        },
        actions: []
    };
    result = designable(defaultValue, editor)(AntdListView);
}

export default result;
