import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
import glyphMap from './iconfont.json';
import iconfont from './iconfont.ttf';

function injectFont(font, fontName) {
    const reactNativeVectorIconsRequiredStyles = `@font-face { src:url(${font});font-family: ${fontName}; }`;
    // create stylesheet
    const style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = reactNativeVectorIconsRequiredStyles;
    } else {
        style.appendChild(document.createTextNode(reactNativeVectorIconsRequiredStyles));
    }
    // inject stylesheet
    document.head.appendChild(style);
}
injectFont(iconfont, 'iconfont');
const iconSet = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');

export default iconSet;
