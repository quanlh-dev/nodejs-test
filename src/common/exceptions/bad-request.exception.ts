import { HttpStatus } from '~common';
import { I18Key } from '~i18n';
import { HttpException } from '@nestjs/common';

export class BadRequestException extends HttpException {
    constructor(message: I18Key = 'Bad Request') {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
