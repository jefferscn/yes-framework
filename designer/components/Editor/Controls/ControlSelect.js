import React, { Component } from 'react';
import Select from './Select';

export default Select((context, props) => {
    const billform = context.getBillForm();
    if (!billform) {
        return null;
    }
    const list = billform.form.getComponentList();
    let data = Object.values(list).map((item) => {
        return {
            key: item.key,
            type: item.tagName,
            caption: item.caption || item.key
        };
    });
    if (props.meta.controlType) {
        data = data.filter((item) => item.type === props.meta.controlType);
    }
    return data;
});

// class ListViewBasics extends Component {
//     static propTypes = {
//         items: PropTypes.object,
//         handleValueChange: PropTypes.func,
//     };
//     dirtyRows = [];
//     handleItemPress(e, rowData) {
//         this.props.handleValueChange(rowData.key, rowData.caption);
//     }
//     renderRow = (rowData) => {
//         const key = rowData.key;
//         return (
//             <ListItem
//                 centerElement={rowData.caption}
//                 rightElement={this.props.value === key ? 'done' : <View style={{ minHeight: 48 }} />}
//                 onPress={(e) => this.handleItemPress(e, rowData)}
//                 onRightElementPress={(e) => this.handleItemPress(e, rowData)}
//                 divider
//             />
//         );
//     };
//     componentWillMount() {
//         if (this.props.value) {
//             this.dirtyRows = this.props.value;
//         }
//         const ds = new ListView.DataSource({
//             rowHasChanged: (r1, r2) => {
//                 const result = r1 !== r2 || this.dirtyRows.includes('' + r1.oid) || this.dirtyRows.includes('' + r2.oid)
//                 return result;
//             },
//         });
//         let dataSource;
//         if (this.props.items) {
//             dataSource = ds.cloneWithRows(this.props.items);
//         } else {
//             dataSource = ds.cloneWithRows([]);
//         }
//         this.setState({
//             dataSource,
//         });
//     }
//     componentWillReceiveProps(props, contet) {
//         this.dirtyRows = Array.concat(this.props.value, props.value);
//         let dataSource = this.state.dataSource;

//         if (props.items) {
//             dataSource = dataSource.cloneWithRows(props.items);
//         } else {
//             dataSource = dataSource.cloneWithRows([]);
//         }
//         this.setState({
//             dataSource,
//             items: props.items,
//         });
//     }
//     render() {
//         // if (this.props.modalLoading && !this.props.items) {
//         //     return (
//         //         <View style={this.props.style}>
//         //             <ActivityIndicator size="large" />
//         //         </View>
//         //     );
//         // }
//         return (
//             <View style={this.props.style}>
//                 <ListView
//                     dataSource={this.state.dataSource}
//                     renderRow={this.renderRow}
//                 />
//             </View>
//         );
//     }
// }

// @observer
// class ControlSelect extends Component {
//     static contextTypes = {
//         getBillForm: PropTypes.func,
//     }

//     defaultProps = {
//         controlType: null,
//     }
//     @observable modalShow = false;
//     getItemList = () => {
//         const billform = this.context.getBillForm();
//         if (!billform) {
//             return null;
//         }
//         const list = billform.form.getComponentList();
//         let data = Object.values(list).map((item) => {
//             return {
//                 key: item.key,
//                 type: item.tagName,
//                 caption: item.caption || item.key
//             };
//         });
//         if (this.props.meta.controlType) {
//             data = data.filter((item) => item.type === this.props.meta.controlType);
//         }
//         return data;
//     }

//     handleValueChange = (key, caption) => {
//         this.props.onChange(key);
//         this.modalShow = false;
//     }

//     onPress = () => {
//         this.modalShow = true;
//     }

//     closeModal = () => {
//         this.modalShow = false;
//     }

//     render() {
//         return <View onClick={this.onPress} style={this.props.style}>
//             <Text>{this.props.value}</Text>
//             <Modal
//                 animationType={"slide"}
//                 transparent={true}
//                 visible={this.modalShow}
//                 onRequestClose={this.closeModal}
//             >
//                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                     <View style={{ width: 500, height: '80%' }}>
//                         <ListViewBasics
//                             items={this.getItemList()}
//                             handleValueChange={this.handleValueChange}
//                             value={this.props.value}
//                         />
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     }
// }

// export default ControlSelect;