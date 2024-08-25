import { Global, Module } from '@nestjs/common';
import {
    I18nModule as NestI18nModule,
    I18nJsonLoader,
    AcceptLanguageResolver,
} from 'nestjs-i18n';
import * as path from 'path';

// class I18Loader extends I18nAbstractLoader {
//     load(): Promise<any> {
//         return Promise.resolve(this.loadTranslations());
//     }

// }

@Global()
@Module({
    imports: [
        NestI18nModule.forRoot({
            fallbackLanguage: 'en',
            loaderOptions: {
                path: path.join('dist/i18n/'),
                watch: true,
            },
            loader: I18nJsonLoader,
            resolvers: [AcceptLanguageResolver],
        }),
    ],
    controllers: [],
    providers: [],
})
export class I18nModule {}
