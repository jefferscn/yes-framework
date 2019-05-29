import Select from './Select';
import Controls from '../../../../src/config/control';

export default Select((context, props) => {
    const { meta } = props;
    const {  category, detailType, yigoId } = meta;
    let cc = Controls;
    let dtlType = detailType;
    if(yigoId) {
        const cmp = context.getCotnextComponent(yigoId);
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
                })
            }
        });
        return result;
    }
    const data = Object.keys(cc).map((type)=> {
        return {
            key:type,
            caption: type,
        }
    });
    return data;
});
