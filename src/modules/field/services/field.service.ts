import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { FieldEntity } from 'src/common/entites/field.entity';
import { EntityManager } from 'typeorm';
import { BaseService } from '~common';
import { CreateFieldDto } from '../dto/requests/create-field.request.dto';
import { FieldListDto } from '../dto/response/field-list.response.dto';
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

    async getFields(): Promise<FieldListDto> {
        try {
            const qb = this.repository.builder('field').selectColumns([
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
            ]);

            const items = await qb.getMany();

            return new FieldListDto(items);
        } catch (error) {
            throw error;
        }
    }

    async createField(field: CreateFieldDto) {
        try {
            const newField = {
                ...field,
            };
            await this.repository.insert(newField);
        } catch (error) {
            throw error;
        }
    }
}
