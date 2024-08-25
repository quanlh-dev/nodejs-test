import {
    INPUT_TEXT_MAX_LENGTH,
    JoiEnum,
    JoiOptional,
    JoiValidate,
    RequestBodyDto,
    TEXTAREA_MAX_LENGTH,
} from '~common';
import { Joi } from '~plugins';
import { FieldType } from '../../field.constant';

export class CreateFieldDto extends RequestBodyDto {
    @JoiValidate(Joi.string().max(INPUT_TEXT_MAX_LENGTH).min(1))
    @JoiOptional()
    name: string;

    @JoiValidate(Joi.number().max(1000).min(0))
    @JoiOptional()
    offsetFrom: number;

    @JoiValidate(Joi.number().max(1000).min(0))
    @JoiOptional()
    offsetTo: number;

    @JoiValidate(Joi.string().max(TEXTAREA_MAX_LENGTH).min(1))
    @JoiOptional()
    description: string;

    @JoiEnum(FieldType)
    @JoiOptional()
    type: FieldType;
}
