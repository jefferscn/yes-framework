import React, { PureComponent } from 'react';
import { Svr } from 'yes-core';

export default (Comp) => {
    class EntryRightWrap extends PureComponent {
        state = {
            allEntry: null,
            init: false,
        }
        async componentDidMount() {
            const paras = {
                cmd: "GetEntry",
                service: "WebMetaService"
            };
            const list = await Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, paras);
            let allEntry = new Set();
            this.initAllEntrys(list.entry, allEntry);
            // this.allEntry = allEntry;
            this.setState({
                allEntry: allEntry,
                init: true,
            });
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
            return (entry && this.state.allEntry) ? this.state.allEntry.has(entry) : false;
        }
        render() {
            return <Comp init={this.state.init} hasEntryRight={this.hasEntryRight} {...this.props} />;
        }
    }
    return EntryRightWrap;
}
