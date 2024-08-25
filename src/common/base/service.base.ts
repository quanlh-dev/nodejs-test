import { IAuthUser, ContextProvider, Optional } from '~common';
import { CommonService } from './../modules/services/common.service';
import { I18nService } from 'nestjs-i18n';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult, FindManyOptions, In } from 'typeorm';
import { BaseEntity } from '../entites/BaseEntity';
import { BaseRepository } from './repository.base';

export interface IBaseService<T> {
    findAll(): Promise<T[]>;

    findById(id: EntityId): Promise<T>;

    findByIds(id: [EntityId]): Promise<T[]>;

    store(data: any): Promise<T>;

    update(id: EntityId, data: any): Promise<T>;

    softDelete(id: EntityId): Promise<DeleteResult>;
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
    // @Inject()
    // moduleRef: ModuleRef;

    @Inject()
    readonly i18n: I18nService;

    @Inject()
    readonly configService: ConfigService;

    @Inject()
    commonService: CommonService;

    readonly repository?: R;

    get authUser(): Optional<IAuthUser> {
        return ContextProvider.getAuthUser();
    }

    async checkExist(where: FindManyOptions<T>): Promise<boolean> {
        return await this.repository.isExist(where);
    }

    // async onModuleInit() {
    //     // this.commonService = this.moduleRef.resolve(CommonService);
    //     const contextId = ContextIdFactory.create();
    //     const rr = { asd: 'da' };
    //     this.moduleRef.registerRequestByContextId(rr, contextId);
    //     this.commonService = await this.moduleRef.resolve(
    //         CommonService,
    //         contextId,
    //     );
    // }

    async findAll(conditions?: FindManyOptions<T>): Promise<T[]> {
        return await this.repository.find(conditions);
    }

    findById(id: EntityId): Promise<Optional<T>> {
        return this.repository.findOne({
            where: {
                id,
            } as any,
        });
    }

    findByIds(ids: [EntityId]): Promise<T[]> {
        return this.repository.find({
            where: {
                id: In(ids),
            } as any,
        });
    }

    store(data: any): Promise<T> {
        return this.repository.save({ ...data });
    }

    async update(id: EntityId, data: any): Promise<T> {
        await this.repository.update(id, data);
        return this.findById(id);
    }

    softDelete(id: EntityId): Promise<DeleteResult> {
        return this.repository.softDelete(id);
    }
}
