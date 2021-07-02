import './preview.css';
import { ControlMappings } from 'yes-comp-react-native-web';
import { Switch, MonthPicker} from 'yes-framework/export';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

ControlMappings.defaultControlMapping.reg('checkbox', Switch);
ControlMappings.defaultControlMapping.reg('monthpicker', MonthPicker);
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true },
  viewport: {
    viewports: MINIMAL_VIEWPORTS,
    defaultViewport: "Small mobile",
  }
}