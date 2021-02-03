class YIGOID {
    static newInstance(args) {
        return new Element(args);
    }
    types = null
    constructor(types) {
        this.types = types;
    }
}
