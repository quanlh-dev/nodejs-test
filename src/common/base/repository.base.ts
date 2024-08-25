// import { FindManyOptions } from 'typeorm';
import {
    EntityManager,
    EntityTarget,
    FindManyOptions,
    FindOptionsWhere,
    QueryRunner,
} from 'typeorm';

/* eslint-disable @typescript-eslint/no-empty-interface */
import { Repository as TypeormRepository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Optional, ContextProvider, BaseQueryBuilder } from '~common';
import { BaseEntity } from '../entites/BaseEntity';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars
interface IRepository<T extends BaseEntity> {
    // findOne(id: number): Promise<T>;
}

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

    async getLastItem(): Promise<T> {
        return await this.builder(this.tableName)
            .orderByColumn('id', 'DESC')
            .limit(1)
            .getOneEntity();
    }

    public async insertAndGet(
        data: QueryDeepPartialEntity<T>,
    ): Promise<Optional<T>> {
        const authUser = ContextProvider.getAuthUser();
        const insertResult = await this.insert({
            ...data,
            createdBy: authUser?.id,
        });
        const id = insertResult?.identifiers?.[0]?.id;
        if (id) {
            return await this.getDetailById(id);
        } else return undefined;
    }

    public async updateAndGet(
        f: FindOptionsWhere<T>,
        data: QueryDeepPartialEntity<T>,
    ): Promise<Optional<T>> {
        const authUser = ContextProvider.getAuthUser();

        const updateResult = await this.update(f, {
            ...data,
            updatedBy: authUser?.id,
        });
        if (updateResult?.affected > 0)
            return await this.getDetailByFindCondition(f);
        else {
            return null;
        }
    }
}
