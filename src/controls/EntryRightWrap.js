import React, { PureComponent } from 'react';
import { Svr } from 'yes-core';

export default (Comp) => {
    class EntryRightWrap extends PureComponent {
        async componentDidMount() {
            const paras = {
                cmd: "GetEntry",
                service: "WebMetaService"
            };
            const list = await Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, paras);
            let allEntry = new Set();
            this.initAllEntrys(list.entry, allEntry);
            this.allEntry = allEntry;
        }
        initAllEntrys = (entry, result) => {
            if (!entry) {
                return;
            }
            if (!entry.children || entry.children.length == 0) {
                result.add(entry.key);
                return;
            }
            for (let i = 0; i < entry.children.length; i++) {
                this.initAllEntrys(entry.children[i], result);
            }
        }
        hasEntryRight = (entry) => {
            return (entryKey && this.allEntry) ? this.allEntry.has(entry) : false;
        }
        render() {
            return <Comp hasEntryRight={this.hasEntryRight} {...this.props} />;
        }
    }
    return EntryRightWrap;
}
