import { History } from 'yes-platform';

export const openForm = (formKey, oid, status)=> {
    History.push(`card/YES/${formKey}/${oid}/${status}`);
}

export const newForm = (formKey) => {
    History.push(`card/YES/${formKey}/new/NEW`);
}
