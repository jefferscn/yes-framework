import designable from 'yes-designer/utils/designable';
export default function(cls, defaultValue, editor) {
    if(__DESIGN__) {
        return designable(defaultValue, editor)(cls);
    }
    return cls;
}
