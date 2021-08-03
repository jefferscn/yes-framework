import React, { useState, useEffect } from 'react';
import TemplateView from '../TemplateView';
import { YIUI } from 'yes-core';
// import { FormPara } from '../config/index';

export default (entry, FormPara) => {
    return ({ document }) => {
        const { formKey, oid, status } = entry;
        const [realOID, setRealOID] = useState(oid);
        useEffect(() => {
            const processNewForm = async () => {
                if (oid === 'new') {
                    const newOid = await YIUI.RemoteService.applyNewOID();
                    setRealOID(newOid);
                } else {
                    setRealOID(oid);
                }
            }
            processNewForm();
        }, [formKey, oid]);

        if (oid === 'new') {
            return null;
        }
        // const params = FormPara ? FormPara[formKey] : null;
        const [fKey] = formKey.split('*');
        return (
            <TemplateView
                formKey={fKey}
                oid={realOID || -1}
                document={document}
                // params={params}
                status={status || 'EDIT'}
            />
        );
    }
}
