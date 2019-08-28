export default function(cls, defaultValue, editor) {
    if(__DESIGN__) {
        const designable = require('yes-designer/utils/designable').defualt;
        return designable(defaultValue, editor)(cls);
    }
    return cls;
}
