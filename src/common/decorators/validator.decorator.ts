import { RequestDto, convertEnumToValues, PHONE_NUMBER_REGEX } from '~common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import type { ValidationOptions } from 'class-validator';
import { registerDecorator } from 'class-validator';
import Joi from 'joi';
import JoiDateExtension from '@joi/date';
import {
    METADATA_KEY,
    MIN_PAGE,
    MAX_PAGE,
    DEFAULT_PAGE,
    MIN_LIMIT,
    MAX_LIMIT,
    DEFAULT_LIMIT,
    MAX_LENGTH_SEARCH_KEYWORD,
    ORDER_DIRECTION,
    DEFAULT_ORDER_DIRECTION,
    DEFAULT_ORDER_BY,
    BIRTHDAY_MIN_DATE,
    DATE_FORMAT,
    INPUT_TEXT_MAX_LENGTH,
} from '~common';
import { JoiMessage } from '~plugins';

const JoiDate = Joi.extend(JoiDateExtension);

export function IsPassword(
    validationOptions?: ValidationOptions,
): PropertyDecorator {
    return (object, propertyName: string) => {
        registerDecorator({
            propertyName,
            name: 'isPassword',
            target: object.constructor,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: string) {
                    return /^[\d!#$%&*@A-Z^a-z]*$/.test(value);
                },
            },
        });
    };
}

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

// export function JoiArray<T extends RequestDto>(
//     dtoClassOrItemSchema: T | Joi.AnySchema,
//     schema?: Joi.ArraySchema,
// ): PropertyDecorator {
//     console.log();

//     let itemSchema = Joi.any();
//     let itemType: any = 'string';
//     if (Joi.isSchema(dtoClassOrItemSchema)) {
//         itemSchema = dtoClassOrItemSchema;
//         itemType = dtoClassOrItemSchema.type;
//     } else {
//         itemSchema = (dtoClassOrItemSchema as any)?.getJoiSchema() ?? Joi.any();
//         itemType = dtoClassOrItemSchema;
//     }

//     const joiSchema = Joi.array().items(itemSchema).concat(schema);
//     const decorators = [
//         JoiValidate(joiSchema),
//         ApiProperty({ isArray: true, type: itemType }),
//     ];
//     return applyDecorators(...decorators);
// }

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

export function Password(): PropertyDecorator {
    return applyDecorators(
        JoiValidate(
            Joi.string()
                .min(6)
                .max(INPUT_TEXT_MAX_LENGTH)
                .label('user.fields.password'),
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

export function Birthday(): PropertyDecorator {
    return applyDecorators(
        JoiValidate(
            JoiDate.date()
                .format(DATE_FORMAT.YYYY_MM_DD_HYPHEN)
                .min(BIRTHDAY_MIN_DATE)
                .max(Date.now())
                .messages(
                    new JoiMessage({
                        'date.max': 'Birthday must be smaller than current day',
                    }),
                ),
        ),
    );
}

export function PhoneNumber(): PropertyDecorator {
    return applyDecorators(JoiValidate(Joi.string().regex(PHONE_NUMBER_REGEX)));
}

export function Id(): PropertyDecorator {
    return applyDecorators(JoiValidate(Joi.number().min(1).positive()));
}
