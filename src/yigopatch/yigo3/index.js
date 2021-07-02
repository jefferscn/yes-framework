import { YIUI, Svr, View, DataDef } from 'yes-core';
import { lodash as $ } from 'yes-common';
import './defaultexprhandler';
import './containerexprhandler';
import './gridexprhandler';
import './listviewexprhandler';
import './tabgroupexprhandler';
import './tableviewexprhandler';
import FormDepend from './formdepend';
import { Expr } from 'yes-core/dist/YIUI-parser';
import { Lang } from 'yes-core/dist/YIUI-common';
import { ConditionParas } from 'yes-core/dist/component/conditionparas';

DataDef.Document.prototype.keys = function() {
    return this.maps.keys();
};

YIUI.RowCountUtil = (function () {
    var Return = {
        getRowCountKey: function (tableKey) {
            return tableKey + "_RowCount";
        },
        getTotalRowCountKey: function (tableKey) {
            return tableKey + "_TotalRowCount";
        },
        getRowCount: function (doc, tableKey) {
            return YIUI.TypeConvertor.toInt(doc.getExpData(this.getRowCountKey(tableKey)));
        },
        getTotalRowCount: function (doc, tableKey) {
            var data = doc.getExpData(this.getTotalRowCountKey(tableKey));
            return data != undefined ? YIUI.TypeConvertor.toInt(data) : -1;
        },
        setRowCount: function (doc, tableKey, rowCount) {
            var key = this.getRowCountKey(tableKey);
            doc.putExpData(key, rowCount);
            doc.expDataType[key] = YIUI.ExpandDataType.LONG;
        },
        setTotalRowCount: function (doc, tableKey, rowCount) {
            var key = this.getTotalRowCountKey(tableKey);
            doc.putExpData(key, rowCount);
            doc.expDataType[key] = YIUI.ExpandDataType.LONG;
        },
        rmTotalRowCount: function (doc, tableKey) {
            var key = this.getTotalRowCountKey(tableKey);
            doc.rmExpData(key, key);
        }
    };
    return Return;
})();

YIUI.Form.prototype.oldinit = YIUI.Form.prototype.init;

YIUI.Form.prototype.init = function (metaForm, formID) {
    this.oldinit(metaForm, formID);
    this.dependency = new FormDepend(this);
    this.dependency.build();
}

if (!Array.prototype.removeElement) {
    Array.prototype.removeElement = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
}

Array.prototype.add = function (obj) {
    return this.push(obj);
};

YIUI.MetaForm.prototype.oldinit = YIUI.MetaForm.prototype.init;

YIUI.MetaForm.prototype.init = function (jsonObj) {
    this.oldinit(jsonObj);
    this.operations = [];
    var operationCollection = jsonObj['operationCollection'];
    if (operationCollection) {
        this.operations = operationCollection.items.concat();
    }

    var uiCheckRuleCollection = jsonObj['uiCheckRuleCollection'];
    if (uiCheckRuleCollection) {
        this.uichecks = uiCheckRuleCollection.slice();
    }
}

Expr.Lexer = function (s) {
    this.s = s;
    this.len = s ? s.length : 0;
    this.li = null;
    this.lv = null;
    this.flv = null;
    this.type = -1;
    this.start = -1;
    this.pos = 0;
    this.b_skip = false;
    this.c_skip = false;
    this.obj = -1;
    this.err = -1;
    this.lastID = -1;
};

Lang.impl(Expr.Lexer, {
    setContent: function (s) {
        this.s = s;
        this.pos = 0;
        this.len = s.length;
    },
    skipB: function (c) {
        var r = c;
        this.b_skip = false;
        while (c == ' ' || c == '\t' || c == '\n' || c == '\r') {
            this.b_skip = true;
            if (this.pos < this.len) {
                c = this.s.charAt(this.pos);
            } else {
                this.err = -1;
                return r;
            }
            r = c;
            ++this.pos;
            ++this.start;
        }
        return r;
    },
    skipC: function (c) {
        var r = c;
        this.c_skip = false;
        if (this.pos < this.len) {
            var oldPos = this.pos;
            var oldStart = this.start;
            var found = false;
            if (c == '/') {
                if (this.pos < this.len) {
                    c = this.s.charAt(this.pos);
                    ++this.pos;
                    ++this.start;
                    if (c == '/') {
                        if (this.pos < this.len) {
                            c = this.s.charAt(this.pos);
                            ++this.pos;
                            ++this.start;
                            while (c != '\n' && this.pos < this.len) {
                                if (this.pos < this.len) {
                                    c = this.s.charAt(this.pos);
                                    ++this.pos;
                                    ++this.start;
                                }
                            }
                            if (this.pos < this.len) {
                                c = this.s.charAt(this.pos);
                                ++this.pos;
                                ++this.start;
                                r = c;
                            } else {
                                r = '$';
                            }

                            found = true;
                        }
                    } else if (c == '*') {
                        if (this.pos < this.len) {
                            c = this.s.charAt(this.pos);
                            ++this.pos;
                            ++this.start;

                            while (true) {
                                if (c == '*') {
                                    if (this.pos < this.len && this.s.charAt(this.pos) == '/') {
                                        ++this.pos;
                                        ++this.start;
                                        found = true;
                                        break;
                                    }
                                }
                                if (this.pos < this.len) {
                                    c = this.s.charAt(this.pos);
                                    ++this.pos;
                                    ++this.start;
                                } else {
                                    break;
                                }
                            }

                            if (found) {
                                if (this.pos < this.len) {
                                    c = this.s.charAt(this.pos);
                                    ++this.pos;
                                    ++this.start;
                                    r = c;
                                } else {
                                    r = '$';
                                }
                            }
                        }
                    }
                }
            }
            if (!found) {
                this.pos = oldPos;
                this.start = oldStart;
            } else {
                this.c_skip = true;
            }
        }
        return r;
    },
    lookSemi: function () {
        var id = 26;
        var oldPos = this.pos;
        var c = ' ';
        if (this.pos < this.len) {
            c = this.s.charAt(this.pos);
            ++this.pos;

            do {
                c = this.skipB(c);
                if (this.err == -1) {
                    return -1;
                }
                c = this.skipC(c);
                c = this.skipB(c);
                if (this.err == -1) {
                    return -1;
                }
            } while (this.b_skip || this.c_skip);

            if (c == '}') {
                id = 28;
                this.li = "}";
                this.lv = "}";
                return id;
            } else {
                this.pos = oldPos;
            }
        } else {
            id = -1;
        }
        return id;
    },
    lookahead: function (ahc) {
        var oldPos = this.pos;
        var c = ' ';
        if (this.pos < this.len) {
            c = this.s.charAt(this.pos);
            ++this.pos;

            do {
                c = this.skipB(c);
                if (this.err == -1) {
                    return false;
                }
                c = this.skipC(c);
                c = this.skipB(c);
                if (this.err == -1) {
                    return false;
                }
            } while (this.b_skip || this.c_skip);

            if (c == ahc) {
                this.pos = oldPos;
                return true;
            } else {
                this.pos = oldPos;
            }
        }
        this.pos = oldPos;
        return false;
    },
    neg: function () {
        return (this.lastID === -1 || (this.lastID >= 0 && this.lastID <= 13)
            || this.lastID === 17 || this.lastID === 19);
    },
    resolveConst: function (t) {
        if (Expr.eq(t.toLowerCase(), "true")) {
            this.lv = "true";
            this.type = Expr.T_BOOL;
            return 16;
        } else if (Expr.eq(t.toLowerCase(), "false")) {
            this.lv = "false";
            this.type = Expr.T_BOOL;
            return 16;
        }
        return -1;
    },
    resolveID: function (t) {
        var idx = t.indexOf('.');

        if (idx > 0) {
            var first = t.substring(0, idx);
            var second = t.substring(idx + 1);
            this.flv = t;
            t = second;
            this.obj = first;
            this.lv = second;
        } else {
            this.obj = null;
            this.lv = t;
            this.flv = t;
        }

        var id = -1;
        if (Expr.eq(t, "if")) {
            id = 21;
        } else if (Expr.eq(t, "else")) {
            id = 22;
        } else if (Expr.eq(t, "while")) {
            id = 23;
        } else if (Expr.eq(t, "var")) {
            id = 24;
        } else if (Expr.eq(t, "return")) {
            id = 29;
        } else if (Expr.eq(t, "break")) {
            id = 30;
        } else if (Expr.eq(t, "loop")) {
            id = 31;
        } else if (Expr.eq(t, "switch")) {
            id = 33;
        } else if (Expr.eq(t, "case")) {
            id = 34;
        }

        return id;
    },
    next: function (slAsString) {
        this.err = 0;
        this.obj = null;
        this.flv = null;
        var oldPos = this.pos;
        var id = -1;
        var c;
        this.start = this.pos;

        if (this.pos >= this.len)
            return -1;

        c = this.s.charAt(this.pos);
        ++this.pos;

        do {
            c = this.skipB(c);
            if (this.err == -1) {
                return -1;
            }
            c = this.skipC(c);
            c = this.skipB(c);
            if (this.err == -1) {
                return -1;
            }
        } while (this.b_skip || this.c_skip);

        var cnt = 1;
        switch (c) {
            case '+':
                id = 0;
                this.li = "+";
                this.lv = "+";
                break;
            case '-':
                if (this.neg()) {
                    var tmpC = ' ';
                    if (this.pos < this.len) {
                        tmpC = this.s.charAt(this.pos);
                    }
                    if (tmpC >= '0' && tmpC <= '9') {
                        var isInt = true;
                        if (this.pos < this.len) {
                            c = this.s.charAt(this.pos);
                        }
                        while ((c >= '0' && c <= '9') || c == '.') {
                            if (c == '.')
                                isInt = false;
                            ++cnt;
                            ++this.pos;
                            if (this.pos >= this.len) {
                                break;
                            }
                            c = this.s.charAt(this.pos);
                        }

                        id = 16;
                        this.li = "const";
                        this.lv = this.s.substring(this.start, this.start + cnt);
                        if (isInt)
                            if (this.lv.length > 10) {
                                this.type = Expr.T_NUM;
                            } else {
                                this.type = Expr.T_INT;
                            }
                        else
                            this.type = Expr.T_NUM;
                    } else {
                        id = 2;
                        this.li = "-";
                        this.lv = "-";
                    }
                } else {
                    id = 2;
                    this.li = "-";
                    this.lv = "-";
                }

                break;
            case '*':
                id = 3;
                this.li = "*";
                this.lv = "*";
                break;
            case '/':
                id = 4;
                this.li = "/";
                this.lv = "/";
                break;
            case '(':
                id = 17;
                this.li = "(";
                this.lv = "(";
                break;
            case '{':
                if (slAsString) {
                    var deep = 1;
                    do {
                        if (this.pos < this.len) {
                            c = this.s.charAt(this.pos);
                            if (c == '{') {
                                ++deep;
                            } else if (c == '}') {
                                --deep;
                            }
                            ++this.pos;
                            ++cnt;
                        } else {
                            this.err = 1;
                            return -1;
                        }
                    } while (c != '}' || deep != 0);

                    id = 16;
                    this.type = Expr.T_STR;
                    this.li = "const";
                    this.lv = this.s.substring(this.start + 1, this.start + cnt - 1);
                } else {
                    id = 27;
                    this.li = "{";
                    this.lv = "{";
                }
                break;
            case ')':
                id = 18;
                this.li = ")";
                this.lv = ")";
                break;
            case '}':
                id = 28;
                this.li = "}";
                this.lv = "}";
                break;
            case ',':
                id = 19;
                this.li = ",";
                this.lv = ",";
                break;
            case ';':
                id = 26;
                this.li = ";";
                this.lv = ";";
                id = this.lookSemi();
                break;
            case '!':
                if (this.pos < this.len) {
                    c = this.s.charAt(this.pos);
                    if (c == '=') {
                        id = 9;
                        this.li = "<>";
                        this.lv = "<>";
                        ++this.pos;
                    } else {
                        id = 25;
                        this.li = "!";
                        this.lv = "!";
                    }
                } else {
                    id = 25;
                    this.li = "!";
                    this.lv = "!";
                }
                break;
            case '=':
                if (this.pos < this.len) {
                    c = this.s.charAt(this.pos);
                    if (c == '=') {
                        id = 7;
                        this.li = "==";
                        this.lv = "==";
                        ++this.pos;
                    } else {
                        id = 8;
                        this.li = "=";
                        this.lv = "=";
                    }
                } else {
                    id = 8;
                    this.li = "=";
                    this.lv = "=";
                }
                break;
            case '&':
                if (this.pos < this.len) {
                    c = this.s.charAt(this.pos);
                    if (c == '&') {
                        id = 6;
                        this.li = "&&";
                        this.lv = "&&";
                        ++this.pos;
                    } else {
                        id = 1;
                        this.li = "&";
                        this.lv = "&";
                    }
                } else {
                    id = 1;
                    this.li = "&";
                    this.lv = "&";
                }
                break;
            case '|':
                id = -1;
                if (this.pos < this.len) {
                    c = this.s.charAt(this.pos);
                    if (c == '|') {
                        id = 5;
                        this.li = "||";
                        this.lv = "||";
                        ++this.pos;
                    }
                }
                break;
            case '>':
                if (this.pos < this.len) {
                    c = this.s.charAt(this.pos);
                    if (c == '=') {
                        id = 11;
                        this.li = ">=";
                        this.lv = ">=";
                        ++this.pos;
                    } else {
                        id = 10;
                        this.li = ">";
                        this.lv = ">";
                    }
                } else {
                    id = 10;
                    this.li = ">";
                    this.lv = ">";
                }
                break;
            case '<':
                if (this.pos < this.len) {
                    c = this.s.charAt(this.pos);
                    if (c == '=') {
                        id = 13;
                        this.li = "<=";
                        this.lv = "<=";
                        ++this.pos;
                    } else if (c == '>') {
                        id = 9;
                        this.li = "<>";
                        this.lv = "<>";
                        ++this.pos;
                    } else {
                        id = 12;
                        this.li = "<";
                        this.lv = "<";
                    }
                } else {
                    id = 12;
                    this.li = "<";
                    this.lv = "<";
                }
                break;
            case '\'':
                do {
                    if (this.pos < this.len) {
                        c = this.s.charAt(this.pos);
                        ++this.pos;
                        ++cnt;
                    } else {
                        this.err = 1;
                        return -1;
                    }
                } while (c != '\'');

                id = 16;
                this.li = "const";
                this.type = Expr.T_STR;
                this.lv = this.s.substring(this.start + 1, this.start + cnt - 1);
                break;
            case '"':
                do {
                    if (this.pos < this.len) {
                        c = this.s.charAt(this.pos);
                        ++this.pos;
                        ++cnt;
                    } else {
                        this.err = 1;
                        return -1;
                    }
                } while (c != '"');

                id = 16;
                this.type = Expr.T_STR;
                this.li = "const";
                this.lv = this.s.substring(this.start + 1, this.start + cnt - 1);
                break;
            case ':':
                id = 35;
                this.li = ":";
                this.lv = ":";
                break;
            default:
                if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z')) {
                    var hasColon = false;
                    if (this.pos < this.len) {
                        c = this.s.charAt(this.pos);
                        while ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || c == '.'
                            || c == '_' || c == ':') {
                            if (c == ':') {
                                hasColon = true;
                            }
                            ++cnt;
                            ++this.pos;
                            if (this.pos >= this.len) {
                                break;
                            }
                            c = this.s.charAt(this.pos);
                        }
                    }

                    if (hasColon) {
                        id = 32;
                        this.li = "range";
                        this.lv = this.s.substring(this.start, this.start + cnt);
                    } else {
                        id = 15;
                        this.li = "id";
                        this.lv = this.s.substring(this.start, this.start + cnt);
                        var nID = -1;
                        nID = this.resolveConst(this.lv);
                        if (nID != -1) {
                            id = nID;
                            this.li = "const";
                        } else {
                            nID = this.resolveID(this.lv);
                            if (nID != -1) {
                                id = nID;
                                this.li = this.lv;
                            } else {
                                if (this.lookahead('(')) {
                                    id = 14;
                                    this.li = "fun";
                                }
                            }
                        }
                    }
                } else if (c >= '0' && c <= '9') {
                    var isInteger = true;
                    if (this.pos < this.len) {
                        c = this.s.charAt(this.pos);
                        while ((c >= '0' && c <= '9') || c == '.') {
                            if (c == '.')
                                isInteger = false;
                            ++cnt;
                            ++this.pos;
                            if (this.pos >= this.len) {
                                break;
                            }
                            c = this.s.charAt(this.pos);
                        }
                    }

                    id = 16;
                    if (isInteger) {
                        this.type = Expr.T_INT;
                    } else {
                        this.type = Expr.T_NUM;
                    }
                    this.li = "const";
                    this.lv = this.s.substring(this.start, this.start + cnt);
                }
                break;
        }
        // 如果上次的符号是}，那么如果符号不是(-1)、(;)、(else)、(})，则需要补充(;)，此时需要回退输出缓冲区
        if (this.lastID == Expr.R_BR) {
            if (id != -1 && id != Expr.SEMI && id != Expr.ELSE && id != Expr.R_BR) {
                id = Expr.SEMI;
                this.li = ";";
                this.lv = ";";
                this.pos = oldPos;
            }
        }

        this.lastID = id;
        return id;
    },
    getLexID: function () {
        return this.li;
    },
    getLexValue: function () {
        return this.lv;
    },
    getFullLexValue: function () {
        return this.flv;
    },
    getType: function () {
        return this.type;
    },
    getErr: function () {
        return this.err;
    },
    getObj: function () {
        return this.obj;
    }
});
