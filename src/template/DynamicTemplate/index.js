import { DynamicBillForm } from 'yes-platform';
import defaultTemplateMapping from '../defaultTemplateMapping';
import { getMappedComponentHOC } from 'yes'; // eslint-disable-line import/no-unresolved

const WrappedDynamicTemplate = getMappedComponentHOC(DynamicBillForm);
defaultTemplateMapping.reg('dynamic', WrappedDynamicTemplate);
export default WrappedDynamicTemplate;
