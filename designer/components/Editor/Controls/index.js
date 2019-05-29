import Text from './Text';
import Toggle  from './Toggle';
import Combobox from './Combobox';
import controlWrap from '../ControlWrap';
import ControlSelect from './ControlSelect';
import DesignControlSelect from './DesignControlSelect';
import ListColumnSelect from './ListColumnSelect';
import SubForm from './SubForm';
import RouteSelect from './RouteSelect';

export default {
    Text: controlWrap(Text),
    Toggle: controlWrap(Toggle),
    Combobox: controlWrap(Combobox),
    ControlSelect: controlWrap(ControlSelect),
    DesignControlSelect: controlWrap(DesignControlSelect),
    SubForm: controlWrap(SubForm),
    ListColumnSelect: controlWrap(ListColumnSelect),
    RouteSelect: controlWrap(RouteSelect),
}
