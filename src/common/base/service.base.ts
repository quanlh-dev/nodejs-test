import { Optional } from '~common';
import { I18nService } from 'nestjs-i18n';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EntityId } from 'typeorm/repository/EntityId';
import { FindManyOptions } from 'typeorm';
import { BaseEntity } from '../entites/BaseEntity';
import { BaseRepository } from './repository.base';

export interface IBaseService<T> {
    findById(id: EntityId): Promise<T>;
}

@Injectable()
export class BaseService<
    T extends BaseEntity,
    R extends BaseRepository<T> = any,
> implements IBaseService<T>
{
    constructor(repository?: R) {
        this.repository = repository;
    }

    @Inject()
    readonly i18n: I18nService;

    @Inject()
    readonly configService: ConfigService;

    readonly repository?: R;

    async checkExist(where: FindManyOptions<T>): Promise<boolean> {
        return await this.repository.isExist(where);
    }

    findById(id: EntityId): Promise<Optional<T>> {
        return this.repository.findOne({
            where: {
                id,
            } as any,
        });
    }
}
