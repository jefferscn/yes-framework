export default function injectFont(font, fontName) {
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
