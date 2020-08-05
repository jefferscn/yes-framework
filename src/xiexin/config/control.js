// import Login from '../controls/Login';
// import Home from '../controls/Home';
// import FlexBox from '../controls/FlexBox';
// import FromTo from '../controls/FromTo';
// import ImageCarouselGrid from '../controls/ImageCarouselGrid';
// import MyInfo from '../controls/MyInfo';
// import CustomTabBar from '../controls/CustomTabBar';
// import DateRangeSelect from '../controls/DateRangeSelect';
// import PhoneLogin from '../controls/PhoneLogin';
// import Seperator from '../controls/Seperator';
// import { ChainDict } from 'yes-comp-react-native-web';
// import FSSC_InvoiceEntry from '../controls/FSSC_InvoiceEntry';
// import VisibleEqual from '../controls/VisibleEqual';
// import VisibleNotEmpty from '../controls/VisibleNotEmpty';
// import FSSC_HospitalityReimbursement from '../controls/FSSC_HospitalityReimbursement';
// import FSSC_ExpenseAccountBillImportV from '../controls/FSSC_ExpenseAccountBillImportV';
// import FSSC_TrainTicketBooks_modal from '../controls/FSSC_TrainTicketBooks_modal';
// import TreeDictRow from '../controls/TreeDictRow';
// import FeeTypeIcon from '../controls/FeeTypeIcon';
// import BooksTypeImage from '../controls/BooksTypeImage';
// import SourceTypeIcon from '../controls/SourceTypeIcon';
// import CardListItem from '../controls/CardListItem';
// import FSSC_ShowInvoiceReport from '../controls/FSSC_ShowInvoiceReport';
// import BKContainer from '../controls/BKContainer';
// import Setting from '../controls/Setting';
// import BottomTabBar from '../controls/BottomTabBar';
// import TabCenterIcon from '../controls/TabCenterIcon';
// import WorkflowList from '../controls/WorkflowList';
// import FSSC_ExpenseAccountBill from '../controls/FSSC_ExpenseAccountBill';
// import AntdListItem from '../controls/AntdListItem';
// import FSSC_PersonMsg from '../controls/FSSC_PersonMsg';
// import Card from '../controls/Card';

// export default { 
//     CustomTabBar,
//     ChainDict,
//     DateRangeSelect,
//     Login,
//     FSSC_InvoiceEntry,
//     FlexBox,
//     FromTo,
//     ImageCarouselGrid,
//     Home,
//     PhoneLogin,
//     MyInfo,
//     Seperator,
//     VisibleEqual,
//     VisibleNotEmpty,
//     FSSC_HospitalityReimbursement,
//     FSSC_ExpenseAccountBillImportV,
//     FSSC_TrainTicketBooks_modal,
//     TreeDictRow,
//     BooksTypeImage,
//     FeeTypeIcon,
//     SourceTypeIcon,
//     CardListItem,
//     FSSC_ShowInvoiceReport,
//     BKContainer,
//     BottomTabBar,
//     Setting,
//     TabCenterIcon,
//     WorkflowList,
//     FSSC_ExpenseAccountBill,
//     AntdListItem,
//     FSSC_PersonMsg,
//     Card,
// };
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

export default obj;