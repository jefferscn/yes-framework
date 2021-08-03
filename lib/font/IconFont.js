import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
import { font } from '../project';
var glyphMap = font.glyphMap, ttf = font.ttf;
function injectFont(font, fontName) {
    var reactNativeVectorIconsRequiredStyles = "@font-face { src:url(" + font + ");font-family: " + fontName + "; }";
    // create stylesheet
    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = reactNativeVectorIconsRequiredStyles;
    }
    else {
        style.appendChild(document.createTextNode(reactNativeVectorIconsRequiredStyles));
    }
    // inject stylesheet
    document.head.appendChild(style);
}
injectFont(ttf, 'iconfont');
var iconSet = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');
export default iconSet;
