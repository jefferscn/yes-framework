export default {
    formTemplate: "modal",
    popup: true,
    content: {
        type: "element",
        elementType: "Invoice",
        elementProps: {
            rows: [
                [{
                    key: 'Station_geton',
                    label: '出发'
                },
                {
                    "type": "element",
                    "elementType": "AwesomeFontIcon",
                    "elementProps": {
                        name: "long-arrow-right",
                        size: 40,
                    }
                },
                {
                    key: 'Station_getoff',
                    label: '到达'
                }],
                [
                    {
                        key: 'FSSC_Name',
                        label: '姓名'
                    },
                    {
                        key: 'FSSC_Total',
                        label: '金额'
                    },
                    {
                        key: 'FSSC_Date',
                        label: '日期'
                    }
                ],
                [
                    {
                        key: 'FSSC_Time',
                        label: '时间'
                    },
                    {
                        key: 'FSSC_Seat',
                        label: '坐席'
                    },
                    {
                        key: 'Train_Number',
                        label: '车次'
                    }
                ],
                [
                    {
                        key: 'Serial_number',
                        label: '发票码'
                    }
                ]
            ]
        }
    }
}
