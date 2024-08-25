import {
    Controller,
    HttpException,
    InternalServerErrorException,
} from '@nestjs/common';
import { I18nContext, TranslateOptions } from 'nestjs-i18n';
import { I18Key } from './../../i18n/index';

@Controller()
export class BaseController {
    readonly i18n = I18nContext.current();

    translate(key: I18Key, options?: TranslateOptions): string {
        return this.i18n.translate(key.toString(), options);
    }

    constructor() {
        console.log('');
    }

    handleError(error: Error) {
        if (error instanceof HttpException) {
            throw error;
        }
        throw new InternalServerErrorException(error);
    }
}
