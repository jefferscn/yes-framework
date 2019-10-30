import Select from './ListSelect';

export default Select((context, props) => {
    const { meta, yigoId } = props;
    const {  category, detailType } = meta;
    let cc = context.getAllControls();
    let dtlType = detailType;
    if(yigoId) {
        const cmp = props.store.context.getContextComponent(yigoId);
        if(cmp) {
            dtlType = cmp.tagName;
        }
    }
    if(category) {
        const result = [];
        const Controls = context.getAllControls();
        cc = Object.entries(Controls).forEach(([key, c])=>{ 
            if(c.category === category && c.detailType == dtlType) {
                result.push({
                    key,
                    caption: key,
                    categroy: c.category,
                    detailType: c.detailType,
                })
            }
        });
        return result;
    }
    const data = Object.keys(cc).map((type)=> {
        return {
            key:type,
            caption: type,
            category: type.category,
            detailType: type.detailType,
        }
    });
    return data;
});
