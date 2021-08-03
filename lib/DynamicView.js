var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useState, useEffect } from 'react';
import TemplateView from './TemplateView';
import { YIUI } from 'yes-core';
// import { FormPara } from './config/index';
export default (function (_a) {
    var navigation = _a.navigation, route = _a.route, document = _a.document;
    var _b = route.params, metaKey = _b.metaKey, id = _b.id, parent = _b.parent, status = _b.status;
    var _c = useState(route.params.id), realOID = _c[0], setRealOID = _c[1];
    useEffect(function () {
        var processNewForm = function () { return __awaiter(void 0, void 0, void 0, function () {
            var newOid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(id === 'new')) return [3 /*break*/, 2];
                        return [4 /*yield*/, YIUI.RemoteService.applyNewOID()];
                    case 1:
                        newOid = _a.sent();
                        setRealOID(newOid);
                        return [3 /*break*/, 3];
                    case 2:
                        setRealOID(id);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        processNewForm();
    }, [metaKey, id]);
    if (realOID === 'new') {
        return null;
    }
    // const params = FormPara ? FormPara[metaKey] : null;
    var formKey = metaKey.split('*')[0];
    return (React.createElement(TemplateView, { formKey: formKey, oid: realOID || -1, document: document, parent: parent, 
        // params={params}
        status: status || 'EDIT' }));
});
// export default class RouteComponent extends Component {
//     state = {
//         oid: this.props.navigation.state.params.id,
//     }
//     async componentWillMount() {
//         await this.processNewForm(this.props);
//     }
//     componentWillReceiveProps(props) {
//         const params = props.navigation.state.params;
//         const oldParams = this.props.navigation.state.params;
//         if (params.metaKey !== oldParams.metaKey || params.id !== oldParams.id) {
//             this.processNewForm(props);
//         }
//     }
//     componentWillUnmount() {
//         // YIUI.GlobalMessageBus.removeListener('updateview');// 这里有问题
//     }
//     processNewForm = async (props) => {
//         if (this.isNew(props)) {
//             const newOid = await YIUI.RemoteService.applyNewOID();
//             this.setState({
//                 oid: newOid,
//             });
//         } else {
//             this.setState({
//                 oid: props.navigation.state.params.id,
//             })
//         }
//     }
//     isNew(props) {
//         return props.navigation.state.params.id === 'new';
//     }
//     render() {
//         if (this.state.oid === 'new') {
//             return null;
//         }
//         const parent = this.props.navigation.state.params.parent;
//         const metaKey = this.props.navigation.state.params.metaKey
//         const params = FormPara ? FormPara[metaKey] : null;
//         const [formKey] = metaKey.split('*');
//         return (
//             <TemplateView
//                 formKey={formKey}
//                 oid={this.state.oid || -1}
//                 // document={this.state.document}
//                 parent={parent}
//                 params={params}
//                 status={this.props.navigation.state.params.status || 'EDIT'}
//             />
//         );
//     }
// }
