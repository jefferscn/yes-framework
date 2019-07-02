import React, { Component } from 'react';
import Select from './ListSelect';

export default Select(async (context, props) => {
    const routeCfg = props.store.getRouteCfg();
    if(!routeCfg.loaded) {
        await routeConfig.reloadContent();
    }
    const data = JSON.parse(routeCfg.content);
    return data.map((item)=> {
        return {
            key: item.key,
            caption: item.key,
        }
    });
});
