import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    BaseEntity as TypeOrmBaseEntity,
    UpdateDateColumn,
} from 'typeorm';

export type EntityId = number;

export abstract class BaseEntity extends TypeOrmBaseEntity {
    @PrimaryGeneratedColumn()
    id: EntityId;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt: Date;

    @Column({ nullable: true })
    createdBy: number;

    @Column({ nullable: true })
    updatedBy: number;

    @Column({ nullable: true })
    deletedBy: number;

    static tableName(): string {
        return '';
        // return this.getRepository().metadata.tableName;
    }
}
