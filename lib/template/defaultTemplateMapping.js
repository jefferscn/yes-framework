var TemplateMapping = /** @class */ (function () {
    function TemplateMapping() {
        this.data = new Map();
    }
    TemplateMapping.prototype.reg = function (type, Control) {
        this.data.set(type, Control);
    };
    TemplateMapping.prototype.get = function (type) {
        var result = this.data.get(type);
        if (!result) {
            console.log("template " + type + " not supported!"); // eslint-disable-line
        }
        return result;
    };
    return TemplateMapping;
}());
var defaultTemplateMapping = new TemplateMapping();
export default defaultTemplateMapping;
