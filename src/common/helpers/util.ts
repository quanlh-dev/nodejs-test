import { ColumnOfEntityWithAlias, BaseEntity } from '~common';
import _, { isNil } from 'lodash';

export function convertEnumToValues(enumType: any): any[] {
    type EnumValueType = [`${typeof enumType}`];
    const values: EnumValueType[] = Object.values(enumType);
    return values;
}

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

export function isEmptyValue(value: any): boolean {
    return value === '' || isNil(value) || isNaN(value);
}
