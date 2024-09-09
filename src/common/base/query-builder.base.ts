import {
    ColumnOfEntity,
    columnsWithAlias,
    ColumnOfEntityWithAlias,
} from '~common';
import { BaseEntity } from 'src/common/entites/BaseEntity';
import { Brackets, Like, QueryBuilder, SelectQueryBuilder } from 'typeorm';
import _ from 'lodash';

export abstract class BaseQueryBuilder<
    T extends BaseEntity,
> extends SelectQueryBuilder<T> {
    constructor(queryBuilder: QueryBuilder<T>) {
        super(queryBuilder);
    }

    withAlias(columnName: string) {
        return `${this.alias}.${columnName}`;
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
