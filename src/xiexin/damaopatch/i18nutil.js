import i18n from '../i18n';

class I18nUtil {
    static formatMessage(text) {
        if (!text || !navigator.language) {
            return text;
        }
        const data = i18n[navigator.language];
        const result = data && data[text] ? data[text] : text;
        return result;
    }
}
export default I18nUtil;