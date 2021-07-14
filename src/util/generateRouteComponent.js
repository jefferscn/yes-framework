import React from 'react';
import TemplateView from '../TemplateView';
import { YIUI } from 'yes-core';
import { FormPara } from '../config/index';

export default (entry) => {
    return ({ document }) => {
        const { formKey, oid, status } = entry;
        const [realOID, setRealOID] = useState(id);
        useEffect(() => {
            const processNewForm = async (props) => {
                if (id === 'new') {
                    const newOid = await YIUI.RemoteService.applyNewOID();
                    setRealOID(newOid);
                } else {
                    setRealOID(id);
                }
            }
            processNewForm(this.props);
        }, [metaKey, id]);

        if (oid === 'new') {
            return null;
        }
        const params = FormPara ? FormPara[formKey] : null;
        const [fKey] = metaKey.split('*');
        return (
            <TemplateView
                formKey={fKey}
                oid={realOID || -1}
                document={document}
                params={params}
                status={status || 'EDIT'}
            />
        );
    }
}
// export default (entry) => {
//     return class RouteComponent extends Component {
//         state = {
//             oid: entry.oid,
//         }

//         isNew() {
//             return this.state.oid === 'new';
//         }

//         async componentWillMount() {
//             if (this.isNew()) {
//                 const data = await YIUI.DocService.newDocument(entry.formKey);
//                 const newOid = await YIUI.RemoteService.applyNewOID();
//                 data.oid = newOid;
//                 data.state = YIUI.DocType.NEW;
//                 const key = `${entry.formKey}.${newOid}`;
//                 await cacheSystem.current.FormDataCache.put(key, {
//                     key,
//                     data,
//                 });
//                 this.setState({
//                     oid: newOid,
//                 });
//                 // History.push(`card/YES/${entry.formKey}/${newOid}/NEW`);
//                 this.props.navigation.setParams({
//                     oid: newOid,
//                 });
//             }
//         }

//         render() {
//             if (this.isNew()) { // 如果是新增单据，则需要在本控件中请求一个新的Document，放到cache中，以保持
//                 return null;                // Navigation中引用的单据额一致
//             }
//             return (
//                 <TemplateView
//                     formKey={entry.formKey}
//                     oid={this.state.oid || -1}
//                     status={entry.status || 'EDIT'}
//                 />
//             );
//         }
//     };
// };
