import _ from 'lodash';
import { BaseEntity, QueryBuilder, SelectQueryBuilder } from 'typeorm';
import { ColumnOfEntityWithAlias, columnsWithAlias } from '~common';

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
}
