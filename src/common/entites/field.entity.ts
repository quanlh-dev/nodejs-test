import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TABLE_NAME } from '~database/constant';
import { FieldType } from 'src/modules/field/field.constant';

const NAME = TABLE_NAME.FIELD;
@Entity({ name: NAME })
export class FieldEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

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
