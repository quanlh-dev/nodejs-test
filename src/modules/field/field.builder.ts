import { FieldEntity } from 'src/common/entites/field.entity';
import { QueryBuilder } from 'typeorm';
import { BaseQueryBuilder } from '~base/query-builder.base';

export class FieldQueryBuilder extends BaseQueryBuilder<FieldEntity> {
    constructor(queryBuilder: QueryBuilder<FieldEntity>) {
        super(queryBuilder);
    }
}
