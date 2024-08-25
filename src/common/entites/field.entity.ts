import { Column, Entity } from 'typeorm';

import { BaseEntity } from 'src/common/entites/BaseEntity';
import { TABLE_NAME } from '~database/constant';
import { FieldType } from 'src/modules/field/field.constant';

const NAME = TABLE_NAME.FIELD;
@Entity({ name: NAME })
export class FieldEntity extends BaseEntity {
    @Column({ nullable: false, type: 'varchar', length: 255 })
    name: string;

    @Column({ nullable: false, enum: FieldType })
    type: string;

    @Column({ nullable: false, type: 'int' })
    offsetFrom: number;

    @Column({ nullable: false, type: 'int' })
    offsetTo: number;

    @Column({ nullable: false, type: 'varchar', length: 2000 })
    description: string;
}
