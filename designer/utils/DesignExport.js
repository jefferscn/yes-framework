export default function(cls, defaultValue, editor) {
    if(__DESIGN__) {
        const designable = require('./designable').default;
        return designable(defaultValue, editor)(cls);
    }
    return cls;
}
