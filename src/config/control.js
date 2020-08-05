import { Components } from 'yes-comp-react-native-web';
// import { CellLayoutList as CellLayoutList, Text, ListComponents } from 'yes-comp-react-native-web';
// import { Timeline, TextGrid, ComboBox, Button } from 'yes-comp-react-native-web';
// import HasDetailSign from '../controls/HasDetailSign';
// import MultiControl from '../controls/MultiControl';
// import GpsText from '../controls/GpsText';
import AwesomeFontIcon from 'react-native-vector-icons/FontAwesome';
// import MapText from '../controls/MapText';
// import Image from '../controls/Image';
// import CellLayoutGridView from '../controls/CellLayoutGridView';
// import Header from '../controls/Header';
// import FormTitle from '../controls/FormTitle';
// import Searchbar from '../controls/Searchbar';
// import ListView from '../controls/ListView';
// import ListText from '../controls/ListText';
// import GridView from '../controls/GridView';
// import SegementToolbar from '../controls/SegementToolbar';
// import SegementCombobox from '../controls/SegementCombobox';
import IconFont from '../font';
// import MoneyWithCurrency from '../controls/MoneyWithCurrency';
// import SplitText from '../controls/SplitText';
// import PopoverCombobox from '../controls/PopoverCombobox';
// import GridActionButton from '../controls/GridActionButton';
// import OpenFormActionButton from '../controls/OpenFormActionButton';
// import ButtonActionButton from '../controls/ButtonActionButton';
// import GridSelect from '../controls/GridSelect';
// import VisibleFormEditable from '../controls/VisibleFormEditable';
// import AttachmentList from '../controls/AttachmentList';
// import CheckboxLabel from '../controls/CheckboxLabel';
// import FilterBlock from '../controls/FilterBlock';
// import FlexBox from '../controls/FlexBox';
// import AttachmentAction from '../controls/AttachmentAction';
// import VisibleRelated from '../controls/VisibleRelated';
import CellLayoutTemplate from '../template/TabTemplate/CellLayoutTemplate';

// import { controls } from '../project';

// export default { 
//     Button,
//     Login,
//     CellLayoutList, 
//     Timeline, 
//     TextGrid, 
//     HasDetailSign,
//     MultiControl,
//     GpsText,
//     GridSelect,
//     MapText,
//     Image,
//     CellLayoutGridView,
//     Header,
//     FormTitle,
//     Searchbar,
//     ListView,
//     GridView,
//     SegementToolbar,
//     Text,
//     IconFont,
//     ListText,
//     MoneyWithCurrency,
//     SplitText,
//     PopoverCombobox,
//     SegementCombobox,
//     GridActionButton,
//     OpenFormActionButton,
//     ButtonActionButton,
//     ComboBox,
//     VisibleFormEditable,
//     AttachmentList,
//     CheckboxLabel,
//     FilterBlock,
//     FlexBox,
//     VisibleRelated,
//     AttachmentAction,
//     AwesomeFontIcon,
//     CellLayoutTemplate,
//     ...controls,
// };
import { controls } from '../project';
const context = require.context('../controls', true, /.js$/);

const obj = {};
context.keys().forEach((key) => {
  const c = context(key).default;
  if(c.key) {
    obj[c.key] =  c;
  } else {
    const name = key.split('/').pop() // remove the first 2 characters
      .split('.').shift(); // remove the file extension
    obj[name] = c;
  }
});

Object.keys(Components).forEach((key)=>{
    obj[key] = Components[key];
});

obj['IconFont'] = IconFont;
obj['AwesomeFontIcon'] = AwesomeFontIcon;
obj['CellLayoutTemplate'] = CellLayoutTemplate;

Object.keys(controls).forEach((control)=>{
    obj[control] = controls[control];
});

export default obj
