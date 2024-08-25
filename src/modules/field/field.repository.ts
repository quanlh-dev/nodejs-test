import { DataSource, FindOptionsWhere } from 'typeorm';
import { BaseRepository } from '~common';
import { FieldQueryBuilder } from './field.builder';
import { Injectable } from '@nestjs/common';
import { FieldEntity } from 'src/common/entites/field.entity';

// @EntityRepository(FieldEntity)
@Injectable()
export class FieldRepository extends BaseRepository<FieldEntity> {
    constructor(private dataSource: DataSource) {
        super(FieldEntity, dataSource.createEntityManager());
    }
    getDetailByFindCondition(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        findCondition: FindOptionsWhere<FieldEntity>,
    ): Promise<FieldEntity> {
        throw new Error('Method not implemented.');
    }

    builder(alias: string): FieldQueryBuilder {
        return new FieldQueryBuilder(this.createQueryBuilder(alias));
    }
}
