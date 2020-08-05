import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BMapUtil } from 'rc-bmap';

export default class BaiduMapProvider extends Component {
    static childContextTypes = {
        getPositionString: PropTypes.func,
        getPoint: PropTypes.func,
        getBaiduMapAk: PropTypes.func,
    }

    getChildContext() {
        return {
            getPositionString: this.getPositionString,
            getPoint: this.getPoint,
            getBaiduMapAk: this.getBaiduMapAk,
        };
    }

    getBaiduMapAk = () => {
        return this.props.ak || 'fSDn0wEEkKVVunWlh1GqyMoU';
    }

    addBMapScript = () => {
        const ak = this.getBaiduMapAk();
        const version = 3;
        if (!global.BMap && !global.mapLoader) {
            global.mapLoader = new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = `https://api.map.baidu.com/api?v=${version}.0&ak=${ak}&callback=initBMapCallBack`;
                document.head.appendChild(script);
                global.initBMapCallBack = () => {
                    resolve(global.BMap);
                    document.head.removeChild(script);
                    delete global.mapLoader;
                    delete global.initBMapCallBack;
                };
            });
        }
        return global.mapLoader;
    }

    getPoint = async (address, city) => {
        await this.addBMapScript();
        return await BMapUtil.getPoint(address, city);
    }

    getPositionString = async (point) => {
        await this.addBMapScript();
        const address = await BMapUtil.getLocation(BMapUtil.BPoint(point));
        return address;
    }

    render() {
        const { children } = this.props;
        return children;
    }
}
