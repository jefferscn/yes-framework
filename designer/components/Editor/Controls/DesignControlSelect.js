import Select from './ListSelect';
import Controls from '../../../../src/config/control';

export default Select((context, props) => {
    const { meta, yigoId } = props;
    const {  category, detailType } = meta;
    let cc = Controls;
    let dtlType = detailType;
    if(yigoId) {
        const cmp = context.getContextComponent(yigoId);
        if(cmp) {
            dtlType = cmp.tagName;
        }
    }
    if(category) {
        const result = [];
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
