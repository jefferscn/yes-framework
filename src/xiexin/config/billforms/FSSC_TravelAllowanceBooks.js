export default {
    "formTemplate": "auto",
    "head": {
        "type": "element",
        "elementType": "Header",
        "elementProps": {
            "canBack": true,
            "titleElement": {
                "type": "element",
                "elementType": "FormTitle",
                "elementProps": {
                    "containerStyle": {
                        "alignItems": "center",
                        "justifyContent": "center"
                    }
                }
            }
        }
    },
    "action": {
        "type": "element",
        "elementType": "VisibleRelatedDisabled",
        "elementProps": {
            "yigoid": "EnteyInvoice",
            "element": {
                "type": "element",
                "elementType": "ButtonActionButton",
                "elementProps": {
                    "buttonKey": "EnteyInvoice",
                    "style": {
                        "right": "50%",
                        "transform": "translateX(30px)"
                    }
                }
            }
        }
    },
    "items": [
        {
            "type": "element",
            "elementType": "Card",
            "elementProps": {
                "collapseable": false,
                "headIcon": "",
                "title": "基本信息",
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
                            "FeeTypeID",
                            "SourcesOfBooks",
                            "ExpenseDate",
                            "PersonnelID",
                            "IsEnterprisesPay",
                            "CurrencyID",
                            "TotalMoney",
                            "Reason"
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
                "title": "出差信息",
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
                            "StartDate",
                            "EndDate",
                            "WorkingStandard",
                            "WorkingDays",
                            "RestStandard",
                            "RestDays"
                        ]
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
                "Close"
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
