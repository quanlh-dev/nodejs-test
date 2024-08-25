import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
    Scope,
} from '@nestjs/common';
import { ObjectSchema, ValidationResult, ValidationError } from 'joi';

@Injectable({ scope: Scope.REQUEST })
export class JoiValidationPipe implements PipeTransform {
    constructor(private schema?: ObjectSchema) {}

    transform(value: any, metadata: ArgumentMetadata) {
        const metatype = metadata?.metatype;
        // note schema is duplicated if you set this.schema = new schema
        let joiSchema = this.schema;
        if (metatype && !this.schema && (metatype as any)?.getJoiSchema) {
            joiSchema = (metatype as any)?.getJoiSchema();
        }

        if (joiSchema) {
            const validationResult = joiSchema.validate(value, {
                abortEarly: false,
            }) as ValidationResult;

            if (validationResult.error) {
                const { details } = validationResult.error as ValidationError;
                throw new BadRequestException({ errors: details });
            } else {
                return validationResult.value;
            }
        }

        return value;
    }
}
