import { Injectable } from '@nestjs/common';
import { FieldEntity } from 'src/common/entites/field.entity';
import { DataSource } from 'typeorm';
import { BaseRepository } from '~common';
import { FieldQueryBuilder } from './field.builder';

@Injectable()
export class FieldRepository extends BaseRepository<FieldEntity> {
    constructor(private dataSource: DataSource) {
        super(FieldEntity, dataSource.createEntityManager());
    }

    builder(alias: string): FieldQueryBuilder {
        return new FieldQueryBuilder(this.createQueryBuilder(alias));
    }
}
