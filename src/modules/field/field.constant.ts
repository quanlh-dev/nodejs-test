import { FieldEntity } from 'src/common/entites/field.entity';

export enum FieldType {
    STRING_FIELD_SPEC = 'StringFieldSpec',
    NUMBER_FIELD_SPEC = 'NumberFieldSpec',
}

export const userDetailAttributes: (keyof FieldEntity)[] = [
    'id',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy',
];
