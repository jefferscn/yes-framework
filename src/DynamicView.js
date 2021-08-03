import React, { useState, useEffect } from 'react';
import TemplateView from './TemplateView';
import { YIUI } from 'yes-core';
// import { FormPara } from './config/index';

export default ({ navigation, route, document }) => {
    const { metaKey, id, parent, status } = route.params;
    const [realOID, setRealOID] = useState(route.params.id);
    useEffect(() => {
        const processNewForm = async () => {
            if (id === 'new') {
                const newOid = await YIUI.RemoteService.applyNewOID();
                setRealOID(newOid);
            } else {
                setRealOID(id);
            }
        }
        processNewForm();
    }, [metaKey, id]);

    if (realOID === 'new') {
        return null;
    }
    // const params = FormPara ? FormPara[metaKey] : null;
    const [formKey] = metaKey.split('*');
    return (
        <TemplateView
            formKey={formKey}
            oid={realOID || -1}
            document={document}
            parent={parent}
            // params={params}
            status={status || 'EDIT'}
        />
    );
}
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
