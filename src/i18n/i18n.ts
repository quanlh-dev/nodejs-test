/* eslint-disable */
import i18n from 'i18n-js';
import en from './en';
import vi from './vi';
import validation from './en/validation.json';

i18n.fallbacks = true;
i18n.translations = { en, vi };

i18n.locale = 'en';

/**.0
 * Builds up valid keypaths for translations.
 * Update to your default locale of choice if not English.
 */
export type DefaultLocale = typeof en;
export type ValidationKey = keyof typeof validation;
/*eslint-disable-next-line @typescript-eslint/ban-types*/
export type I18Key = RecursiveKeyOf<DefaultLocale> | String;

type RecursiveKeyOf<TObj extends Record<string, any>> = {
    [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
        ? // @ts-ignore
          `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
        : `${TKey}`;
}[keyof TObj & string];

/**
 * Translates text.
 *
 * @param key The i18n key.
 */
export function translate(
    key: I18Key,
    options?: i18n.TranslateOptions,
): string {
    return !!i18n.lookup(key) ? i18n.t(key, options) : key;
}
