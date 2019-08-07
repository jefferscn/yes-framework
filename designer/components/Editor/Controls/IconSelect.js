import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Select from './Select';
import { observer, PropTypes } from 'mobx-react';
import { observable } from 'mobx';
import { SearchBar, Pagination, Grid } from 'antd-mobile';

const styles = StyleSheet.create({
    display: {
        width: 30,
        height: 30,
    }, 
    selected : {
        backgroundColor:"yellow"
    },
    icon: {
        fontSize: 24 
    },
    container: {
        width: 500,
    }
})

@observer
class IconWall extends Component {
    @observable pageSize = this.props.column * this.props.row;
    @observable currentPage = 1;
    @observable totalPage = Math.ceil(this.props.data.length/this.pageSize);
    @observable selected = '';
    static contextTypes = {
        getIconComponent: PropTypes.func,
        getIconData: PropTypes.func,
    }
    renderItem = (item)=> {
        const Icon = this.context.getIconComponent();
        return <Icon style={[styles.icon,this.selected===item?styles.selected:null]} onPress={()=>this.onPress(item)} name={item} />;
    }
    onPress = (icon)=> {
        this.props.onChange(icon);
    }
    onPageChange = (page) => {
        // console.log(e);
        this.currentPage = page;
    }
    componentWillReceiveProps(props) {
        this.pageSize = props.column * props.row;
        this.totalPage = Math.ceil(props.data.length/this.pageSize);
        this.selected = props.value;
        if(this.totalPage < this.currentPage) {
            this.currentPage = this.totalPage;
        }
    }
    render() {
        const start = this.pageSize* (this.currentPage-1);
        const end = (this.pageSize) * (this.currentPage);
        const data = this.props.data.slice(start, end);
        return (
            <View>
                <Grid 
                    data = {data} 
                    columnNum = {this.props.column} 
                    renderItem={this.renderItem}
                />
                <Pagination total={this.totalPage} current={this.currentPage} onChange={this.onPageChange} />
            </View>
        )
    }
}
@observer
export default class IconSelect extends Select {
    @observable searchingText = ''
    @observable iconData = Object.keys(this.context.getIconData());
    static contextTypes = {
        getIconData : PropTypes.func,
    }
    static defaultProps = {
        onChange: function () { }
    }
    onClear = ()=> {
        this.searchingText = '';
        this.iconData = Object.keys(IconMapper);
    }
    onSearchTextChange = (v)=> {
        this.searchingText = v;
    }
    onChange = (icon) => {
        this.props.onChange(icon);
    }
    onSubmit = (v)=> {
        this.iconData = Object.keys(IconMapper).filter((icon)=> {
            return icon.includes(v);
        });
    }
    renderDisplay() {
        return (
            <Icon style={styles.icon} name={this.props.value} />
        )
    }
    renderModalContent() {
        const { value, meta } = this.props;
        return (
            <View style={styles.container}>
                <SearchBar
                    style={{ minHeight: 44 }}
                    value={this.searchingText}
                    placeholder={'搜索'}
                    onChange={this.onSearchTextChange}
                    onBlur={this.onBlur}
                    onSubmit={this.onSubmit}
                    onClear={this.onClear}
                />
                <IconWall 
                    data = {this.iconData} 
                    column={10} 
                    row={5} 
                    value={this.props.value}
                    onChange ={this.onChange}
                />
            </View>
        )
    }
}
