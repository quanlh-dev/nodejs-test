import { VirtualColumnOptions } from './../decorators/virtual-column.decorator';
import {
    ColumnOfEntity,
    columnsWithAlias,
    ColumnOfEntityWithAlias,
    METADATA_KEY,
    isEmptyValue,
} from '~common';
import { BaseEntity } from 'src/common/entites/BaseEntity';
import { Brackets, Like, QueryBuilder, SelectQueryBuilder } from 'typeorm';
import _ from 'lodash';

function assignValue<T extends BaseEntity>(entity: T, raw: any): T {
    const metaInfo =
        Reflect.getMetadata(METADATA_KEY.VIRTUAL_COLUMN, entity) ?? {};

    for (const [propertyKey, options] of Object.entries<VirtualColumnOptions>(
        metaInfo,
    )) {
        const columnName = options.name;

        switch (options.type) {
            case 'number':
                entity[propertyKey] = _.toNumberDefault(
                    raw[columnName],
                    options.default,
                );
                break;
            default:
                entity[propertyKey] = raw[columnName];
                break;
        }
    }
    // console.log('...');

    return entity;
}

export abstract class BaseQueryBuilder<
    T extends BaseEntity,
> extends SelectQueryBuilder<T> {
    constructor(queryBuilder: QueryBuilder<T>) {
        super(queryBuilder);
    }

    withAlias(columnName: string) {
        return `${this.alias}.${columnName}`;
    }

    async getManyEntity(): Promise<T[]> {
        const { entities, raw } = await this.getRawAndEntities();
        const items = entities.map((entity, index) => {
            return assignValue(entity, raw[index]);
        });

        return [...items];
    }

    async getOneEntity(): Promise<T> {
        const { entities, raw } = await this.getRawAndEntities();
        if (entities.length > 0) {
            return assignValue(entities[0], raw[0]);
        }
        return null;
    }

    selectColumns<CustomEntity extends BaseEntity = T>(
        cWAs:
            | ColumnOfEntityWithAlias<CustomEntity>[]
            | ColumnOfEntityWithAlias<CustomEntity>,
    ): this {
        if (_.isArray(cWAs)) {
            return this.select(columnsWithAlias(cWAs));
        } else return this.select(columnsWithAlias([cWAs]));
    }

    filterByColumn(columnName: ColumnOfEntity<T>, value: any) {
        return this.where(
            `${this.alias}.${columnName as string} = :${columnName as string}`,
            {
                [columnName as string]: value,
            },
        );
    }

    whereEqual(columnName: ColumnOfEntity<T>, value: any): this {
        return this.where(
            `${this.alias}.${columnName as string} = :${columnName as string}`,
            { [columnName as string]: value },
        );
    }

    whereIn(columnName: ColumnOfEntity<T>, value: any[]): this {
        const columnListAlias = `${columnName as string}List`;
        if (value?.length === 0) {
            return this;
        }
        return this.andWhere(
            `${this.alias}.${columnName as string} IN (:...${columnListAlias})`,
            {
                [columnListAlias]: value,
            },
        );
    }

    search(columnNames: ColumnOfEntity<T>[], keyword: string): this {
        const searchColumns = columnNames as string[];
        return this.andWhere(
            new Brackets((qb) => {
                qb.where(
                    searchColumns.map((searchColumn) => ({
                        [searchColumn]: Like(`%${keyword}%`),
                    })),
                );
            }),
        );
    }

    greaterThan(columnName: ColumnOfEntity<T>, value: any): this {
        if (isEmptyValue(value)) return this;
        return this.andWhere(
            `${this.alias}.${columnName as string} > :${columnName as string}`,
            {
                [columnName as string]: value,
            },
        );
    }

    lessThan(columnName: ColumnOfEntity<T>, value: any): this {
        if (isEmptyValue(value)) return this;

        return this.andWhere(
            `${this.alias}.${columnName as string} < :${columnName as string}`,
            {
                [columnName as string]: value,
            },
        );
    }

    orderByColumn(
        columnName: ColumnOfEntity<T>,
        orderDirection: 'ASC' | 'DESC',
    ): this {
        return this.orderBy(
            `${this.alias}.${columnName as string}`,
            orderDirection,
        );
    }

    pagination(page: number, limit: number): this {
        return this.take(limit).skip((page - 1) * limit);
    }
}
