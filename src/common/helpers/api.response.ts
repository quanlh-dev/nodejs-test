import { ResponseDto } from './../base/dto.base';
import { Injectable } from '@nestjs/common';
import { HttpStatus } from '~common';
import { translate, I18Key } from '~i18n';
import _ from 'lodash';
const DEFAULT_SUCCESS_MESSAGE = 'success';
@Injectable()
export class ApiResponse<T> {
    public code: number;
    public message: string;
    public data?: T;
    public errors: T;
}
export interface IErrorDetail {
    key: string;
    errorCode: number;
    message: string;
}
export type IErrorResponse = ApiResponse<IErrorDetail[]>;

export interface IMeta {
    total: number;
    limit: number;
    lastOrderByValue?: string | number;
    lastOrderId?: number;
}
export class CommonListResponse<T> {
    items: T[];
    meta?: IMeta;
}

export class SuccessResponse<T extends ResponseDto> {
    constructor(data: T | any, message: I18Key = DEFAULT_SUCCESS_MESSAGE) {
        let response: any = data;
        if (data instanceof ResponseDto) {
            const omitProperties: string[] =
                (data.constructor as any)?.getOmitProperties() ?? [];
            response = _.omit(data, omitProperties);
        }

        return {
            code: HttpStatus.OK,
            message,
            data: response,
        };
    }
}

export class ErrorResponse {
    constructor(
        code = HttpStatus.INTERNAL_SERVER_ERROR,
        message: I18Key = '',
        errors: IErrorDetail[] = [],
    ) {
        const err: IErrorResponse = {
            code,
            errors,
            message: translate(message),
        };

        return err;
    }
}

export function notFoundResponse() {
    return new ErrorResponse(HttpStatus.NOT_FOUND, 'notFound');
}
