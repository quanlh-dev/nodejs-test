import { HttpException, ValidationError } from '@nestjs/common';

export class ValidationException extends HttpException {
    errors: ValidationError[];

    constructor(errors: ValidationError[]) {
        super('errors', 400);
        this.errors = errors;
    }
}
