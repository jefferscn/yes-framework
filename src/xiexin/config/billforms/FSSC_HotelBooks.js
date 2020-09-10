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
                            "ExpenseDate",
                            "SourcesOfBooks",
                            "PersonnelID",
                            "IsEnterprisesPay",
                            "CurrencyID",
                            "IsManyPeople",
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
                "title": "入住明细",
                "wrapElement": {
                    "type": "element",
                    "elementType": "VisibleRelated",
                    "elementProps": {
                        "yigoid": "Grid2"
                    }
                },
                "expanded": true,
                "content": {
                    "type": "element",
                    "elementType": "GridView",
                    "elementProps": {
                        "yigoid": "Grid2",
                        "useBodyScroll": true,
                        "removeType": "column",
                        "removeColumn": "Delete",
                        "primaryKey": "cell6",
                        "newElement": {
                            "type": "element",
                            "elementType": "NativeButton",
                            "elementProps": {
                                "title": "新增人员"
                            }
                        },
                        "secondKey": [
                            "cell9", {
                                "type": "element",
                                "elementType": "AwesomeFontIcon",
                                "elementProps": {
                                    "name": "long-arrow-right",
                                    "style": {
                                        "paddingLeft": 8,
                                        "paddingRight": 4,
                                        "display": "flex",
                                        "justifyContent": "center",
                                        "alignItems": "center"
                                    }
                                }
                            }, "cell10"
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
                "title": "发票明细",
                "expanded": true,
                "content": {
                    "type": "element",
                    "elementType": "GridView",
                    "elementProps": {
                        "yigoid": "Grid1",
                        "useBodyScroll": true,
                        // "clickMode": "script",
                        // "clickScript": 'if(IsNewOrEdit()){SetPara("resource", 2);} else{SetPara("resource", 3);} Open(Macro_GetBillKeyByInvoiceType(InvoiceType), InvoiceID, "modal", "View");',
                        "hideAction": true,
                        "removeType": "column",
                        "removeColumn": "DeleteDtl",
                        "headExtra": {
                            "type": "element",
                            "elementType": "MoneyWithCurrency",
                            "elementProps": {
                                "currencyField": {
                                    "type": "element",
                                    "elementType": "SplitText",
                                    "elementProps": {
                                        "yigoid": "CurrencyID",
                                        "style": {
                                            "display": "flex",
                                            "justifyContent": "center",
                                            "alignItems": "center",
                                            "fontSize": 12,
                                            "color": "green",
                                            "paddingRight": 4
                                        }
                                    }
                                },
                                "moneyField": "TotalMoney",
                                "containerStyle": {
                                    "flex": 1
                                }
                            }
                        },
                        "detailElement": {
                            "type": "element",
                            "elementType": "ScriptWrap",
                            "elementProps": {
                                "script": 'if(IsNewOrEdit()){SetPara("resource", 2);} else{SetPara("resource", 3);} Open(Macro_GetBillKeyByInvoiceType(InvoiceType), InvoiceID, "modal", "View");',
                                "element": {
                                    "type": "element",
                                    "elementType": "NativeButton",
                                    "elementProps": {
                                        "title": "打开发票"
                                    }
                                }
                            }
                        },
                        "rightElement": {
                            "type": "element",
                            "elementType": "FlexBox",
                            "elementProps": {
                                "direction": "column",
                                "style": {
                                    "justifyContent": "space-between"
                                },
                                "items": [
                                    {
                                        "type": "element",
                                        "elementType": "SplitText",
                                        "elementProps": {
                                            "yigoid": "FSSC_Date",
                                            "style": {
                                                "fontSize": 12,
                                                "paddingTop": 12,
                                                "textAlign": "right"
                                            }
                                        }
                                    },
                                    {
                                        "type": "element",
                                        "elementType": "MoneyWithCurrency",
                                        "elementProps": {
                                            "currencyField": {
                                                "type": "element",
                                                "elementType": "SplitText",
                                                "elementProps": {
                                                    "yigoid": "Currency",
                                                    "style": {
                                                        "fontSize": 12,
                                                        "paddingRight": 2,
                                                        "textAlign": "right"
                                                    }
                                                }
                                            },
                                            "moneyField": "FSSC_Total",
                                            "containerStyle": {
                                                "paddingBottom": 6,
                                                "justifyContent": "flex-end",
                                                "paddingRight": 0
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        "primaryKey": "FSSC_Number",
                        "secondKey": [
                            "City", "Seller"
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
