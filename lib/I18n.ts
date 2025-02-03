import * as Van from "vanjs-core";
const van = Van.default;

/**
 * A simple i18n class that uses vanjs to create a derived state that translates a key to a string using the current locale
 */
export class I18n {
    _locale: Van.State<string>;
    _currentTranslation: Van.State<Object | undefined>;

    /**
     * @param {Map<string, Object>} translations - Map of translations
     * @param {string} defaultLocale - The default locale
     */
    constructor(translations: Map<string, Object>, defaultLocale: string) {
        this._locale = van.state(defaultLocale);
        this._currentTranslation = van.derive(() => translations.get(this._locale.val));
    }

    /**
     * The current locale state
     * @returns {Van.State<string>} - The current locale state
     */
    get locale(): Van.State<string> {
        return this._locale;
    }

    /**
     * Set the current locale
     * @param {string} locale
     */
    setLocale(locale: string): void {
        this._locale.val = locale;
    }

    /**
     * Translate a key to a string using the current locale
     *
     * @private
     * @param {Object} lang - The language object
     * @param {string[]} splitKey - Parts of the key to translate
     * @param {Object} params - The parameters to pass to the translation function
     * @returns {string | null} - The translated string
     */
    private _translate(lang: any, splitKey: string[], params: Object | null = null): string | null {
        let ns: any = lang;

        for (const part of splitKey) {
            ns = ns[part];
            if (!ns) {
                console.warn(`Translation key not found: ${splitKey.join('.')}`);
                return null;
            }
        }

        let result: string | null = null;
        switch (typeof ns) {
            case 'function':
                result = ns(params);
                break;
            case 'string':
                result = ns;
                break;
            default:
                console.warn(`Unsupported translation type : ${typeof ns}`);
                break;
        }
        return result;
    }

    /**
     * Create a derived state that translates a key to a string using the current locale
     * @param {string} key - The key to translate
     * @param {Object} params - The parameters to pass to the translation function
     * @returns {Van.State<string>} - The state that contains the translated string
     */
    t(key: string, params: Object | null = null): Van.State<string> {
        return van.derive(() => {
            const lang = this._currentTranslation.val;
            let result = key;
            if (!!lang) {
                result = this._translate(lang, key.split('.'), params) || key;
            }
            return result;
        });
    }
}

export default I18n;