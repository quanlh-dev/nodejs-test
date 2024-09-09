import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { FieldEntity } from 'src/common/entites/field.entity';
import { EntityManager } from 'typeorm';
import { BaseService } from '~common';
import { CreateFieldDto } from '../dto/requests/create-field.request.dto';
import { FieldListQueryStringDto } from '../dto/requests/field-list.request.dto';
import { FieldListDto } from '../dto/response/field-list.response.dto';
import { FieldResponseDto } from '../dto/response/field.response.dto';
import { FieldRepository } from '../field.repository';

@Injectable()
export class FieldService extends BaseService<FieldEntity, FieldRepository> {
    constructor(
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
        private readonly fieldRepository: FieldRepository,
    ) {
        super(fieldRepository);
    }

    async getFields(query: FieldListQueryStringDto): Promise<FieldListDto> {
        try {
            const qb = this.repository
                .builder('field')
                .selectColumns([
                    {
                        alias: 'field',
                        columns: [
                            'id',
                            'name',
                            'createdAt',
                            'description',
                            'type',
                            'offsetFrom',
                            'offsetTo',
                            'updatedAt',
                        ],
                    },
                ])
                .search(['name', 'description'], query.keyword)
                .orderByColumn(query.orderBy, query.orderDirection)
                .pagination(query.page, query.limit);

            const [items, totalItems] = await qb.getManyAndCount();

            return new FieldListDto(items, {
                total: totalItems,
                limit: query.limit,
            });
        } catch (error) {
            throw error;
        }
    }

    async getFieldById(id: number): Promise<FieldEntity | undefined> {
        try {
            const field = await this.findById(id);
            return field;
        } catch (error) {
            throw error;
        }
    }

    async createField(field: CreateFieldDto): Promise<FieldResponseDto> {
        try {
            const newField = {
                ...field,
            };
            const insertedField = await this.repository.insert(newField);
            const fieldId = insertedField?.identifiers[0]?.id;
            if (fieldId) {
                const fieldDetail = await this.getFieldById(fieldId);
                return new FieldResponseDto(fieldDetail);
            }
            throw new InternalServerErrorException();
        } catch (error) {
            throw error;
        }
    }
}
