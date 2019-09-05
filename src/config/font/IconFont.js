import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
import injectFont from 'yes-designer/utils/injectFont';
import glyphMap from './iconfont.json';
import iconfont from './iconfont.ttf';

injectFont(iconfont, 'iconfont');
const iconSet = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');

export default iconSet;
