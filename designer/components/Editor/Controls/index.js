import Text from './Text';
import Toggle  from './Toggle';
import Combobox from './Combobox';
import controlWrap from '../ControlWrap';

export default {
    Text: controlWrap(Text),
    Toggle: controlWrap(Toggle),
    Combobox: controlWrap(Combobox),
}
