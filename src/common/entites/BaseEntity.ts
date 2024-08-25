import { ContextProvider } from './../providers/context.provider';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BaseEntity as TypeOrmBaseEntity,
    BeforeInsert,
    BeforeUpdate,
    BeforeSoftRemove,
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

    @BeforeInsert()
    setCreatedBy() {
        this.createdBy = ContextProvider.getAuthUser()?.id;
    }

    @BeforeUpdate()
    setUpdatedBy() {
        this.updatedBy = ContextProvider.getAuthUser()?.id;
    }

    @BeforeSoftRemove()
    setDeleteBy() {
        this.deletedBy = ContextProvider.getAuthUser()?.id;
    }
}
