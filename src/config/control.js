// import { Login as Login1 } from 'yes-platform';
// import { Login } from 'yes-platform';
// import { CellLayoutList as CellLayoutList } from 'yes-platform';
// // import DateText from '../template/ListTemplate/DateText';
// import { Timeline, TextGrid } from 'yes-platform';
// // import Login from '../controls/Login';
// import HasDetailSign from '../controls/HasDetailSign';
// import MultiControl from '../controls/MultiControl';
// import Home from '../controls/Home';
// import GpsText from '../controls/GpsText';
// import MapText from '../controls/MapText';
// import Image from '../controls/Image';
// // import Avatar from '../controls/Avatar';
// // import PathText from '../controls/PathText';
// // import ListRightElement from '../controls/ListRightElement';
// // import AuditIcon from '../controls/AuditStatusIcon';
// // import TextArea from '../controls/TextArea';

// export default { 
//     // Login1, 
//     // Login2, 
//     Login,
//     CellLayoutList, 
//     // DateText, 
//     Timeline, 
//     // Avatar,
//     // TextArea,
//     // AuditIcon, 
//     TextGrid, 
//     HasDetailSign,
//     MultiControl,
//     Home,
//     GpsText,
//     MapText,
//     Image,
//     // PathText, 
//     // ListRightElement 
// };

const context = require.context('../controls', true, /.js$/);

const obj = {};
context.keys().forEach((key) => {
  const countryCode = key.split('/').pop() // remove the first 2 characters
    .split('.').shift(); // remove the file extension
  obj[countryCode] = context(key).default;
});

export default obj;