import { TableColumnOptions } from 'typeorm';

export enum TABLE_NAME {
    FIELD = 'fields',
}

export const createColumns = function (
    columns?: TableColumnOptions[],
): TableColumnOptions[] {
    return [
        {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
        },
        ...columns,
        {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
        },
        {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
        },
        {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
        },
        {
            name: 'createdBy',
            type: 'int',
            isNullable: true,
        },
        {
            name: 'updatedBy',
            type: 'int',
            isNullable: true,
        },
        {
            name: 'deletedBy',
            type: 'int',
            isNullable: true,
        },
    ];
};

// export const createForeignKey = () => {

// }
