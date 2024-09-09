import {
    EntityManager,
    EntityTarget,
    FindManyOptions,
    FindOptionsWhere,
    QueryRunner,
    Repository as TypeormRepository,
} from 'typeorm';
import { BaseQueryBuilder } from '~common';
import { BaseEntity } from '../entites/BaseEntity';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars
interface IRepository<T extends BaseEntity> {}

export abstract class BaseRepository<T extends BaseEntity>
    extends TypeormRepository<T>
    implements IRepository<T>
{
    constructor(
        target: EntityTarget<T>,
        manager: EntityManager,
        queryRunner?: QueryRunner,
    ) {
        super(target, manager, queryRunner);
    }

    get tableName() {
        return this.metadata.tableName;
    }

    abstract builder(alias: string): BaseQueryBuilder<T>;
    abstract getDetailByFindCondition(
        findCondition: FindOptionsWhere<T>,
    ): Promise<T>;

    async isExist(where: FindManyOptions<T>): Promise<boolean> {
        const count = await this.count(where);
        return count > 0;
    }

    async getDetailById(id: number): Promise<T> {
        return await this.getDetailByFindCondition({ id } as any);
    }
}
