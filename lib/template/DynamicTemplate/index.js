import { DynamicBillForm } from 'yes-platform';
import defaultTemplateMapping from '../defaultTemplateMapping';
import { getMappedComponentHOC } from 'yes'; // eslint-disable-line import/no-unresolved
var WrappedDynamicTemplate = getMappedComponentHOC(DynamicBillForm);
defaultTemplateMapping.reg('dynamic', WrappedDynamicTemplate);
export default WrappedDynamicTemplate;
