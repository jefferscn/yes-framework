import zzsImage from '../../res/zzs.png';

export default {
    formTemplate: "modal",
    popup: true,
    content: {
        type: "element",
        elementType: "Invoice",
        elementProps: {
            invoiceImage: zzsImage,
            rows: [
                [{
                    key: 'FSSC_Code',
                    label: '发票代码'
                },
                {
                    key: 'FSSC_Number',
                    label: '发票号码'
                },
                {
                    key: 'Check_code',
                    label: '验证码'
                }],
                [
                    {
                        key: 'FSSC_Total',
                        label: '含税金额',
                    },
                    {
                        key: 'FSSC_Date',
                        label: '开票日期'
                    }
                ],
                [
                    {
                        key: 'Buyer',
                        label: '购买方'
                    },
                    {
                        key: 'Buyer_tax_id',
                        label: '购买方税号'
                    },
                ],
                [
                    {
                        key: 'Service_Name',
                        label: '服务类型'
                    },
                    {
                        key: 'Pretax_amount2',
                        label: '金额'
                    },
                    {
                        key: 'FSSC_Tax',
                        label: '税额'
                    },
                ],
                [
                    {
                        key: 'Seller',
                        label: '销售方'
                    },
                    {
                        key: 'Seller_tax_id',
                        label: '销售方税号'
                    },
                ],
            ]
        }
    }
}
