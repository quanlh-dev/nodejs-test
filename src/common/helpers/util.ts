import _ from 'lodash';
import { BaseEntity } from 'typeorm';
import { ColumnOfEntityWithAlias } from '~common';

export function columnsWithAlias<T extends BaseEntity>(
    tables: ColumnOfEntityWithAlias<T>[],
): string[] {
    return _.concat(
        ...tables.map((table) => {
            if (typeof table.columns === 'string') {
                return [`${table.alias}.${table.columns}`];
            } else if (_.isArray(table.columns)) {
                return table.columns.map(
                    (column) => `${table.alias}.${column as string}`,
                );
            }
        }),
    );
}
