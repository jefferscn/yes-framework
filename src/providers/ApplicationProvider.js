import React from 'react';
import { AppDispatcher, AppStatusStore } from 'yes';
import EntryContext from '../context/Entry';
import { Svr } from 'yes-core';

function reducer(state, action) {
    return { ...state, ...action };
}
const fetchEntry = async () => {
    const paras = {
        cmd: "GetEntry",
        service: "WebMetaService"
    };
    const list = await Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, paras);
    let allEntry = new Set();
    initAllEntrys(list.entry, allEntry);
    return allEntry;
}
const initAllEntrys = (entry, result) => {
    if (!entry) {
        return;
    }
    if (!entry.children || entry.children.length == 0) {
        result.add(entry.key);
        return;
    }
    for (let i = 0; i < entry.children.length; i++) {
        initAllEntrys(entry.children[i], result);
    }
};

export default (props) => {
    const { children } = props;
    const [ state, dispatch ] = React.useReducer(
        reducer,
        AppStatusStore.getState().toJS()
    );
    const loadEntryData = async () => {
        const entryData = await fetchEntry();
        dispatch({
            entries: entryData,
        });
    }
    AppDispatcher.register((action) => {
        switch (action.type) {
            case 'LOGINED':
                dispatch({
                    logined: true,
                    inited: true,
                    userinfo: action.userinfo
                });
                loadEntryData();
                break;
            case 'LOGOUTED':
                dispatch({
                    logined: false,
                    userinfo: null,
                })
                break;
            default:
        }
    });
    return (
        <EntryContext.Provider value={state}>
            {
                children
            }
        </EntryContext.Provider>
    )
}
