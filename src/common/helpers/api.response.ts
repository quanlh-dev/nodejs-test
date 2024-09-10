import _ from 'lodash';
import { HttpStatus } from '~common';
import { ResponseDto } from './../base/dto.base';
const DEFAULT_SUCCESS_MESSAGE = 'success';

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

export class CommonListResponse<T> {
    items: T[];
}

export class SuccessResponse<T extends ResponseDto> {
    constructor(data: T | any, message: string = DEFAULT_SUCCESS_MESSAGE) {
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
        message: string = '',
        errors: IErrorDetail[] = [],
    ) {
        const err: IErrorResponse = {
            code,
            errors,
            message,
        };

        return err;
    }
}
