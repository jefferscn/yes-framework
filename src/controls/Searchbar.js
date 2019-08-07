import React, { PureComponent } from 'react';
import { SearchBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import { ControlWrap as controlWrap } from 'yes';
import designable from 'yes-designer/utils/designable';

const defaultValue = {
    searchText: '',
    lastSearchingText: '',
};
const editor = [
        {
            type: 'ControlSelect',
            key: 'textField',
            caption: '查询文本控件',
            controlType: 'texteditor',
        },
        {
            type: 'ControlSelect',
            key: 'queryButton',
            caption: '查询按钮控件',
            controlType: 'button',
        },
    ];
@designable(defaultValue, editor)
@controlWrap
class YigoSearchbar extends PureComponent {
    static contextTypes = {
        getContextComponentState: PropTypes.func,
        onValueChange: PropTypes.func,
        onControlClick: PropTypes.func,
    }
    state = {
        searchingText: '',
        lastSearchingText: '',
    }
    onSubmit = (value) => {
        if (value === this.state.lastSearchingText) {
            return;
        }
        this.setState({
            searchingText: value,
            lastSearchingText: value,
        });
        this.context.onValueChange(this.props.meta.textField, value);
        this.context.onControlClick(this.props.meta.queryButton);
    }
    onChange = (value) => {
        this.setState({
            searchingText: value,
        });
    }
    onBlur = () => {
        this.onSubmit(this.state.searchingText);
    }
    componentWillReceiveProps(props) {
        this.setState({
            searchingText: props.displayValue,
            lastSearchingText: props.displayValue,
        });
    }
    render() {
        return (
            <SearchBar
                style={{ minHeight: 44 }}
                value={this.state.searchingText}
                placeholder={this.props.placeholder || '搜索'}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onSubmit={this.onSubmit}
                onClear={this.onSubmit}
            />
        );
    }
}

YigoSearchbar.category = 'template';

export default YigoSearchbar;
