import './preview.css';
import { ControlMappings } from 'yes-comp-react-native-web';
import Switch from '../src/controls/Switch';
import MonthPicker from '../src/controls/MonthPicker';

ControlMappings.defaultControlMapping.reg('checkbox', Switch);
ControlMappings.defaultControlMapping.reg('monthpicker', MonthPicker);
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true },
}