import { RelationOptions } from 'typeorm';

export const defaultTypeOrmRelationOptions: RelationOptions = {
    createForeignKeyConstraints: false,
};
