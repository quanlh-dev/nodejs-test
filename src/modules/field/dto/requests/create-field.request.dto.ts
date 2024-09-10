import { RequestBodyDto } from '~common';
import { FieldType } from '../../field.constant';

export class CreateFieldDto extends RequestBodyDto {
    name: string;

    offsetFrom: number;

    offsetTo: number;

    description: string;

    type: FieldType;
}
