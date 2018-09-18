class TemplateMapping {
    constructor() {
        this.data = new Map();
    }

    reg(type, Control) {
        this.data.set(type, Control);
    }

    get(type) {
        const result = this.data.get(type);
        if (!result) {
            console.log(`template ${type} not supported!`); // eslint-disable-line
        }
        return result;
    }
}

const defaultTemplateMapping = new TemplateMapping();
export default defaultTemplateMapping;

