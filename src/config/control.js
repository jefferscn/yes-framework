// import { Login as Login1 } from 'yes-platform';
import { Login } from 'yes-comp-react-native-web';
import { CellLayoutList as CellLayoutList, Text, ListComponents } from 'yes-comp-react-native-web';
// import DateText from '../template/ListTemplate/DateText';
import { Timeline, TextGrid, ComboBox, Button } from 'yes-comp-react-native-web';
// import Login from '../controls/Login';
import HasDetailSign from '../controls/HasDetailSign';
import MultiControl from '../controls/MultiControl';
import GpsText from '../controls/GpsText';
import MapText from '../controls/MapText';
import Image from '../controls/Image';
import CellLayoutGridView from '../controls/CellLayoutGridView';
import Header from '../controls/Header';
import FormTitle from '../controls/FormTitle';
import Searchbar from '../controls/Searchbar';
import ListView from '../controls/ListView';
import ListText from '../controls/ListText';
import GridView from '../controls/GridView';
import Home1 from '../controls/Home1';
// import CalendarGrid from '../controls/CalendarGrid';
// import CalendarDay from '../controls/CalendarDay';
// import CalendarRow from '../controls/CalendarRow';
import SegementToolbar from '../controls/SegementToolbar';
import SegementCombobox from '../controls/SegementCombobox';
import IconFont from '../font';
import MoneyWithCurrency from '../controls/MoneyWithCurrency';
import SplitText from '../controls/SplitText';
import PopoverCombobox from '../controls/PopoverCombobox';
import GridActionButton from '../controls/GridActionButton';
import OpenFormActionButton from '../controls/OpenFormActionButton';
import ButtonActionButton from '../controls/ButtonActionButton';
import GridSelect from '../controls/GridSelect';
import VisibleFormEditable from '../controls/VisibleFormEditable';
import AttachmentList from '../controls/AttachmentList';
import CheckboxLabel from '../controls/CheckboxLabel';
import FilterBlock from '../controls/FilterBlock';
import FlexBox from '../controls/FlexBox';
import VisibleRelated from '../controls/VisibleRelated';

// const { ListText } = ListComponents;
import { controls } from '../project';
// import Login from '../controls/Login';

export default { 
    Button,
    Login,
    CellLayoutList, 
    Timeline, 
    TextGrid, 
    HasDetailSign,
    MultiControl,
    GpsText,
    GridSelect,
    MapText,
    Image,
    CellLayoutGridView,
    Header,
    FormTitle,
    Searchbar,
    ListView,
    GridView,
    Home1,
    // CalendarGrid,
    // CalendarDay,
    // CalendarRow,
    SegementToolbar,
    Text,
    IconFont,
    ListText,
    MoneyWithCurrency,
    SplitText,
    PopoverCombobox,
    SegementCombobox,
    GridActionButton,
    OpenFormActionButton,
    ButtonActionButton,
    ComboBox,
    VisibleFormEditable,
    AttachmentList,
    CheckboxLabel,
    FilterBlock,
    FlexBox,
    VisibleRelated,
    ...controls,
};
