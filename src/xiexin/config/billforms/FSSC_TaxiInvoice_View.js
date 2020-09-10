import taxiImage from '../../res/taxi.png';

export default {
    formTemplate: "modal",
    popup: true,
    content: {
        type: "element",
        elementType: "Invoice",
        elementProps: {
            invoiceImage: taxiImage,
            rows: [
                [{
                    key: 'FSSC_Total',
                    label: '发票金额'
                }],
                [
                    {
                        key: 'Mileage',
                        label: '里程数'
                    }
                ],
                [
                    {
                        key: 'FSSC_Date',
                        label: '时间'
                    },
                ],
                [
                    {
                        key: 'FSSC_Code',
                        label: '发票代码'
                    }
                ],
                [
                    {
                        key: 'FSSC_Number',
                        label: '发票号码'
                    }
                ]
            ]
        }
    }
}
