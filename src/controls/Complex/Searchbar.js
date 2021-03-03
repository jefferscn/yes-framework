import React, { PureComponent } from 'react';
import { SearchBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import { ControlWrap as controlWrap } from 'yes';

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
        this.context.onValueChange(this.props.textField, value);
        this.context.onControlClick(this.props.searchButton);
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

export default controlWrap(YigoSearchbar);
