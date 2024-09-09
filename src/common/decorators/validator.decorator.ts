import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import Joi from 'joi';
import {
    convertEnumToValues,
    DEFAULT_LIMIT,
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
    DEFAULT_PAGE,
    MAX_LENGTH_SEARCH_KEYWORD,
    MAX_LIMIT,
    MAX_PAGE,
    METADATA_KEY,
    MIN_LIMIT,
    MIN_PAGE,
    ORDER_DIRECTION,
    RequestDto,
} from '~common';

type JoiValidateOptions = ApiPropertyOptions;

export type JoiObjectSchema = { [key: string]: Joi.AnySchema };

export function JoiValidate(
    schema: Joi.AnySchema,
    options?: JoiValidateOptions,
): PropertyDecorator {
    const apiProperty = ApiProperty(options);
    const JoiDecorator: PropertyDecorator = (target, propertyName: string) => {
        const joiObject: JoiObjectSchema =
            Reflect.getMetadata(METADATA_KEY.JOI, target) ?? {};
        if (joiObject[propertyName]) {
            joiObject[propertyName] = joiObject[propertyName].concat(schema);
        } else {
            joiObject[propertyName] = schema;
        }
        Reflect.defineMetadata(METADATA_KEY.JOI, joiObject, target);
    };

    return applyDecorators(...[JoiDecorator, apiProperty]);
}

export function JoiOptional(schema?: Joi.AnySchema): PropertyDecorator {
    return schema
        ? JoiValidate(schema.optional(), { required: false })
        : JoiValidate(Joi.optional(), { required: false });
}

export function JoiRequired(schema?: Joi.AnySchema): PropertyDecorator {
    return schema
        ? JoiValidate(schema.required(), { required: true })
        : JoiValidate(Joi.required(), { required: true });
}

export function JoiArray<T>(
    type: (new () => T) | any,
    schema?: Joi.ArraySchema,
): PropertyDecorator {
    const typeOf = typeof type;

    let validValues: any[] = [];
    let itemSchema = Joi.any();
    let itemType: any = 'string';

    if (typeOf === 'function') {
        const typeInstance = new type();
        if (Joi.isSchema(typeInstance)) {
            itemSchema = typeInstance;
        } else if (typeInstance instanceof String) {
            itemSchema = Joi.string();
        } else if (typeInstance instanceof Number) {
            itemSchema = Joi.number();
        } else {
            itemSchema =
                typeof (type as any)?.getJoiSchema === 'function'
                    ? (type as any)?.getJoiSchema()
                    : Joi.any();
        }
    } else if (typeOf === 'object') {
        if (Joi.isSchema(type)) {
            itemSchema = type;
        } else if (Object.values(type)?.length > 0) {
            validValues = Object.values(type);
            itemSchema = Joi.valid(...validValues);
        }
    }

    itemType = itemSchema.type;

    let joiArraySchema = Joi.array().items(itemSchema);

    if (schema) {
        joiArraySchema = joiArraySchema.concat(schema);
    }

    const apiPropertyDecorator =
        validValues.length > 0
            ? ApiProperty({ isArray: true, type: itemType, enum: validValues })
            : ApiProperty({ isArray: true, type: itemType });

    const decorators = [JoiValidate(joiArraySchema), apiPropertyDecorator];
    return applyDecorators(...decorators);
}

export function JoiObject<T extends RequestDto>(
    dtoClass: T,
    schema?: Joi.ObjectSchema,
): PropertyDecorator {
    let joiSchema = Joi.object((dtoClass as any)?.getJoiObject());
    if (schema) joiSchema = joiSchema.concat(schema);
    const decorators = [
        JoiValidate(joiSchema),
        ApiProperty({ isArray: false, type: dtoClass }),
    ];
    return applyDecorators(...decorators);
}

export function JoiEnum(
    joyEnum: any,
    schema?: Joi.AnySchema,
): PropertyDecorator {
    let joiSchema = Joi.any();
    if (schema) joiSchema = joiSchema.concat(schema);
    joiSchema = joiSchema.valid(...Object.values(joyEnum));
    const validValues = convertEnumToValues(joyEnum);

    const decorators = [
        JoiValidate(joiSchema),
        ApiProperty({ enum: validValues }),
    ];
    return applyDecorators(...decorators);
}

export function Page(): PropertyDecorator {
    return applyDecorators(
        JoiOptional(
            Joi.number().min(MIN_PAGE).max(MAX_PAGE).default(DEFAULT_PAGE),
        ),
    );
}

export function Limit(): PropertyDecorator {
    return applyDecorators(
        JoiOptional(
            Joi.number().min(MIN_LIMIT).max(MAX_LIMIT).default(DEFAULT_LIMIT),
        ),
    );
}

export function SearchKeyword(): PropertyDecorator {
    return applyDecorators(
        JoiOptional(
            Joi.string().max(MAX_LENGTH_SEARCH_KEYWORD).allow('').default(''),
        ),
    );
}

export function OrderDirection(): PropertyDecorator {
    return applyDecorators(
        JoiEnum(ORDER_DIRECTION, Joi.string().default(DEFAULT_ORDER_DIRECTION)),
        JoiOptional(),
    );
}

export type OrderByOptions = {
    values: string[];
    default?: string;
};

export function OrderBy(
    options: OrderByOptions = {
        values: ['id', DEFAULT_ORDER_BY],
        default: DEFAULT_ORDER_BY,
    },
): PropertyDecorator {
    return applyDecorators(
        ...[
            JoiEnum(
                options.values,
                Joi.string().default(options?.default ?? DEFAULT_ORDER_BY),
            ),
            JoiOptional(),
        ],
    );
}
