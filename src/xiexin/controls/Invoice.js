import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Header from 'yes-framework/controls/Header';
import { ListComponents } from 'yes-comp-react-native-web';
import FormTitle from 'yes-framework/controls/FormTitle';
import Element from 'yes-framework/template/Element';
import InvoiceValidBadge from './InvoiceValidBadge';

const styles = StyleSheet.create({
    view1: {
    },
    view2: {

    },
    image: {
        height: 200
    },
    row: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    columnTextContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    columnTextLabel: {
        color: 'gray',
    },
    columnTextText: {
        color: 'black',
        fontSize: 20,
        paddingTop: 6,
    },
    flex1: {
        flex: 1,
    }
});

class ColumnLabelText extends PureComponent {
    render() {
        const { style, yigoid, label } = this.props;
        return (
            <View style={[styles.columnTextContainer, style]}>
                <Text style={[styles.columnTextLabel]}>{label}</Text>
                <ListComponents.ListText style={styles.columnTextText} yigoid={yigoid} emptyStr="" />
            </View>
        )
    }
}

class InvoiceRow extends PureComponent {
    render() {
        const { row } = this.props;
        return (<View style={styles.row}>
            {
                row.map(item=>{
                    if(item.type==='element') {
                        return <Element style={styles.flex1} meta={item} />
                    }
                    return <ColumnLabelText style={styles.flex1} yigoid={item.key} label={item.label} />
                })
            }
        </View>);
    }
}

export default class Invoice extends PureComponent {
    static defaultProps = {
        imageField: 'SingleBillPictures2',
    }
    render() {
        const { invoiceImage, imageField, rows, style } = this.props;
        return (
            <View style={[styles.container, style]}>
                <View style={styles.view1}>
                    <ListComponents.ListImage 
                        h={200}
                        w={200}
                        style={styles.image} 
                        yigoid={imageField} />
                </View>
                <View style={styles.view2}>
                    {invoiceImage ? <Image source={invoiceImage} /> : null}
                    {
                        rows.map((row) => 
                            (
                                <InvoiceRow row={row} />
                            )
                        )
                    }
                </View>
                <InvoiceValidBadge yigoid="Validation_Code" />
            </View>
        )
    }
}
