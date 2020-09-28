import img from '../../res/expense.png';
export default {
    "formTemplate": "auto",
    "backgroundImg": img,
    "head": {
        "type": "element",
        "elementType": "Header",
        "elementProps": {
            "canBack": true,
            "mode": "light",
            "headerStyle": {
                "border": 0
            },
            "transparent": true,
            "titleElement": {
                "type": "element",
                "elementType": "FormTitle",
                "elementProps": {
                    "style": {
                        "color": "white"
                    },
                    "containerStyle": {
                        "alignItems": "center",
                        "justifyContent": "center"
                    }
                }
            }
        }
    },
    "items": [
        {
            "type": "element",
            "elementType": "BillCard",
            "elementProps": {
                "avatorField": "BorrowerID",
                "text": "借款人",
                "columnField1": "CCID",
                "columnText1": "财务组织",
                "columnField2": "PayType",
                "columnText2": "支付方式",
                "columnText3": "借款金额",
                "columnField3": "LoanAmount"
            }
        },
        {
            "type": "element",
            "elementType": "Card",
            "elementProps": {
                "collapseable": false,
                "headIcon": "",
                "title": "",
                "expanded": true,
                "content": {
                    "type": "element",
                    "elementType": "CellLayoutTemplate",
                    "elementProps": {
                        "textStyle": {
                            "textAlign": "right",
                            "justifyContent": "flex-end"
                        },
                        "titleStyle": {
                            "justifyContent": "flex-start",
                            "fontSize": "15",
                            "color": "#666666"
                        },
                        "layoutStyle": {
                            "justifyContent": "flex-end"
                        },
                        "items": [
                            "Explain"
                        ]
                    }
                }
            }
        },
        {
            "type": "element",
            "elementType": "Card",
            "elementProps": {
                "collapseable": false,
                "headIcon": "",
                "title": "借款信息",
                "expanded": true,
                "content": {
                    "type": "element",
                    "elementType": "CellLayoutTemplate",
                    "elementProps": {
                        "textStyle": {
                            "textAlign": "right",
                            "justifyContent": "flex-end"
                        },
                        "titleStyle": {
                            "justifyContent": "flex-start",
                            "fontSize": "15",
                            "color": "#666666"
                        },
                        "layoutStyle": {
                            "justifyContent": "flex-end"
                        },
                        "items": [
                            "CCID",
                            "NO",
                            "CostCompayCodeID",
                            "CostDept",
                            "ProjectID",
                            "LoanAmount",
                            "PayType",
                            "IndexID",
                            "CurrencyID"
                        ]
                    }
                }
            }
        },
        {
            "type": "element",
            "elementType": "Card",
            "elementProps": {
                "collapseable": true,
                "headIcon": "",
                "expanded": true,
                "content": {
                    "type": "element",
                    "elementType": "AttachmentList",
                    "elementProps": {
                        "yigoid": "AttachmentGrid",
                        "fileName": "UploadName",
                        "filePath": "Path",
                        "title": "附件",
                        "removable": true
                    }
                }
            }
        }
    ],
    "foot": {
        "type": "element",
        "elementType": "SegementToolbar",
        "elementProps": {
            "ignoreItems": [
                "New",
                "Close",
                "Refresh"
            ],
            "captionMapping": {
                "发送PDF文件至邮箱": "封面打印",
                "撤销已提交审批": "撤销"
            }
        }
    },
    "controls": {

    }
}