import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class WechatProvider extends Component {
    static childContextTypes = {
        // getPicture: PropTypes.func,
        getPosition: PropTypes.func,
        getCurrentAddress: PropTypes.func,
        scanBarcode: PropTypes.func,
    }

    static contentTypes = {
        getPositionString: PropTypes.func,
    }

    loaded = false

    inited = false

    jsApiList = ['chooseImage', 'getLocation', 'scanQRCode']

    loadSdk = () => {
        if (window.wx) {
            this.loaded = true;
            return Promise.resolve();
        }
        return new Promise((rec, rej) => {
            const script = window.document.createElement('script');
            script.src = "https://res.wx.qq.com/open/js/jweixin-1.2.0.js";
            script.type = 'text/javascript';
            script.onload = () => {
                this.loaded = true;
                rec();
            };
            script.onerror = (e) => {
                rej(e);
            };
            window.document.body.appendChild(script);
        });
    }

    initWechat = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(this.props.signurl + "", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        url: document.location.href.split('#')[0],
                    }),
                });
                const result = await response.json();
                wx.config({
                    jsApiList: this.jsApiList,
                    ...result,
                    debug: true,
                });
                wx.ready(() => {
                    resolve();
                });
                wx.error((e) => {
                    reject(e);
                })
            } catch (ex) {
                reject(ex);
            }
        });
    }

    async componentWillMount() {
        try {
            await this.loadSdk();
            if (this.loaded) {
                await this.initWechat();
                this.inited = true;
            }
        } catch (ex) {
            console.log(ex);
        }
    }

    getChildContext() {
        return {
            // getPicture: this.getPicture,
            getPosition: this.getPosition,
            getCurrentAddress: this.getCurrentAddress,
            scanBarcode: this.scanBarcode,
        }
    }

    scanBarcode = () => {
        return new Promise((resolve, reject) => {
            wx.scanQRCode({
                needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    resolve(result);
                },
                fail: function(err) {
                    reject(err);
                },
            });
        });
    }

    getPosition = () => {
        return new Promise((resolve, reject) => {
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    resolve(res);
                },
                fail: (err) => {
                    reject(err);
                }
            });
        })
    }

    getCurrentAddress = async () => {
        const position = await this.getPosition();
        const address = await this.contenxt.getPositionString({ lng: position.longitude, lat: position.latitude });
        return address;
    }

    getPicture = (cameraDirection = Camera.Direction.BACK, quality = 50, targetWidth = 500, ) => {
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            }
        });
    }

    render() {
        console.log('test');
        const { children } = this.props;
        return children;
    }
}

