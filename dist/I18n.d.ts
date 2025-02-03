import * as Van from "vanjs-core";
/**
 * A simple i18n class that uses vanjs to create a derived state that translates a key to a string using the current locale
 */
export declare class I18n {
    _locale: Van.State<string>;
    _currentTranslation: Van.State<Object | undefined>;
    /**
     * @param {Map<string, Object>} translations - Map of translations
     * @param {string} defaultLocale - The default locale
     */
    constructor(translations: Map<string, Object>, defaultLocale: string);
    /**
     * The current locale state
     * @returns {Van.State<string>} - The current locale state
     */
    get locale(): Van.State<string>;
    /**
     * Set the current locale
     * @param {string} locale
     */
    setLocale(locale: string): void;
    /**
     * Translate a key to a string using the current locale
     *
     * @private
     * @param {Object} lang - The language object
     * @param {string[]} splitKey - Parts of the key to translate
     * @param {Object} params - The parameters to pass to the translation function
     * @returns {string | null} - The translated string
     */
    private _translate;
    /**
     * Create a derived state that translates a key to a string using the current locale
     * @param {string} key - The key to translate
     * @param {Object} params - The parameters to pass to the translation function
     * @returns {Van.State<string>} - The state that contains the translated string
     */
    t(key: string, params?: Object | null): Van.State<string>;
}
export default I18n;
