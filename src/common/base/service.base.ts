import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseEntity, FindManyOptions } from 'typeorm';
import { BaseRepository } from './repository.base';

@Injectable()
export class BaseService<
    T extends BaseEntity,
    R extends BaseRepository<T> = any,
> {
    constructor(repository?: R) {
        this.repository = repository;
    }

    @Inject()
    readonly configService: ConfigService;

    readonly repository?: R;

    async checkExist(where: FindManyOptions<T>): Promise<boolean> {
        return await this.repository.isExist(where);
    }
}
