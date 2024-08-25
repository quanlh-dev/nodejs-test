import { HttpStatus } from '~common';
import { I18Key } from '~i18n';
import { HttpException } from '@nestjs/common';

export class NotFoundException extends HttpException {
    constructor(message: I18Key = 'Item not found') {
        super(message, HttpStatus.ITEM_NOT_FOUND);
    }
}
