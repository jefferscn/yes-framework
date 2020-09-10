export default {
    "formTemplate": "auto",
    "action": {
        "type": "element",
        "elementType": "GridActionButton",
        "elementProps": {
            "yigoid": "Grid1",
            "style": {
                "right": "50%",
                "transform": "translateX(30px)"
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
                "bookmark": "Validation_Code2",
                "bookmarkEmptyStr": "未验真",
                "headStyle": {
                    "height": 80
                },
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
                            "FSSC_Type2",
                            "FSSC_Date2",
                            "FSSC_Total2",
                            {
                                "key": "SingleBillPictures2",
                                "imageStyle": {
                                    "width": 100
                                }
                            }
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
                "title": "抵扣信息",
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
                            "Tax_rate2",
                            "FSSC_Tax2",
                            "Pretax_amount2"
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
                        "hideAction": true,
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
                                            "yigoid": "cell2",
                                            "style": {
                                                "fontSize": 12,
                                                "paddingTop": 12,
                                                "textAlign": "right"
                                            }
                                        }
                                    },
                                    {
                                        "type": "element",
                                        "elementType": "ListText",
                                        "elementProps": {
                                            "yigoid": "cell7",
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
                        "primaryKey": {
                            "type": "element",
                            "elementType": "FromTo",
                            "elementProps": {
                                "fromId": {
                                    "type": "element",
                                    "elementType": "SplitText",
                                    "elementProps": {
                                        "yigoid": "cell4",
                                        "showIndex": 1,
                                        "emptyStr": "未填",
                                        "style": {
                                            "display": "flex",
                                            "justifyContent": "center",
                                            "alignItems": "center",
                                            "fontSize": 12,
                                            "paddingRight": 4
                                        }
                                    }
                                },
                                "toId": {
                                    "type": "element",
                                    "elementType": "SplitText",
                                    "elementProps": {
                                        "yigoid": "cell5",
                                        "showIndex": 1,
                                        "emptyStr": "未填",
                                        "style": {
                                            "display": "flex",
                                            "justifyContent": "center",
                                            "alignItems": "center",
                                            "fontSize": 12,
                                            "paddingRight": 4
                                        }
                                    }
                                }
                            }
                        },
                        "secondKey": [
                            "cell3", "cell1"
                        ],
                        "tertiaryKey": [
                            "cell6"
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