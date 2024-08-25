import { ColumnOptions, ColumnType } from 'typeorm';
import { METADATA_KEY, PickOptional } from '../constants';

export type VirtualColumnOptions = PickOptional<
    ColumnOptions,
    'name' | 'default'
> & { type?: Extract<ColumnType, 'number' | 'string' | 'date'> };

export function VirtualColumn(
    options?: VirtualColumnOptions,
): PropertyDecorator {
    return (target, propertyKey) => {
        const metaInfo =
            Reflect.getMetadata(METADATA_KEY.VIRTUAL_COLUMN, target) ?? {};

        const virtualColumnOptions = {
            ...options,
            name: options?.name ?? propertyKey,
        };

        metaInfo[propertyKey] = virtualColumnOptions;

        Reflect.defineMetadata(METADATA_KEY.VIRTUAL_COLUMN, metaInfo, target);
    };
}
