export default (function (payload) {
    if (payload) {
        if (payload.name === 'YigoForm') {
            payload.key = payload.params.metaKey + "-" + payload.params.id;
        }
        if (payload.name === 'Workitem') {
            payload.key = "workitem-" + payload.params.wid;
        }
        if (payload.name === 'YigoFormWithParent') {
            payload.key = payload.params.metaKey + "-" + payload.params.id + "-" + payload.params.parent;
        }
    }
});
