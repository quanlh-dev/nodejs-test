import { Optional } from './../types';
import { IAuthUser } from '~common';
import { LANGUAGES } from '~common';
import { getValue, setValue } from 'express-ctx';

export class ContextProvider {
    private static readonly REQUEST_NAME_SPACE = '___CONTEXT_REQUEST___';

    private static readonly AUTH_USER_KEY = 'CONTEXT_AUTH_USER';

    private static readonly LANGUAGE_KEY = 'CONTEXT_LANGUAGE';

    static get<T>(key: string): T | undefined {
        return getValue<T>(ContextProvider.getKeyWithREQUEST_NAME_SPACE(key));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static set(key: string, value: any): void {
        setValue(ContextProvider.getKeyWithREQUEST_NAME_SPACE(key), value);
    }

    private static getKeyWithREQUEST_NAME_SPACE(key: string): string {
        return `${ContextProvider.REQUEST_NAME_SPACE}.${key}`;
    }

    static setLanguage(language: string): void {
        ContextProvider.set(ContextProvider.LANGUAGE_KEY, language);
    }

    static getLanguage(): LANGUAGES | undefined {
        return ContextProvider.get<LANGUAGES>(ContextProvider.LANGUAGE_KEY);
    }

    static setAuthUser(user: IAuthUser): void {
        ContextProvider.set(ContextProvider.AUTH_USER_KEY, user);
    }

    static getAuthUser(): Optional<IAuthUser> {
        return ContextProvider.get<IAuthUser>(ContextProvider.AUTH_USER_KEY);
    }
}
