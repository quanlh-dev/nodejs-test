/* eslint-disable @typescript-eslint/no-unused-vars */
import { I18Key } from '~i18n';
/* eslint-disable @typescript-eslint/naming-convention */
import 'source-map-support/register';

import type { ObjectLiteral } from 'typeorm';
import { Brackets, QueryBuilder } from 'typeorm';
// import type { Driver } from 'typeorm/driver/Driver';
// import { DriverUtils } from 'typeorm/driver/DriverUtils';
// import type { Alias } from 'typeorm/query-builder/Alias';

import type { BaseEntity } from './entites/BaseEntity';
// import type { AbstractDto } from './common/dto/abstract.dto';
// import { PageDto } from './common/dto/page.dto';
// import { PageMetaDto } from './common/dto/page-meta.dto';
// import type { PageOptionsDto } from './common/dto/page-options.dto';
// import { VIRTUAL_COLUMN_KEY } from './decorators';
import type { KeyOfType } from './types';
import Joi from 'joi';
import { ColumnOfEntity } from './constants';
import { JoiMessage } from '~plugins';

declare module 'joi' {
    interface AnySchema<TSchema = any> extends Joi.SchemaInternals {
        label(name: I18Key): this;
        messages(messages: JoiMessage): this;
    }
}

// function groupRows<T>(
//     rawResults: T[],
//     alias: Alias,
//     driver: Driver,
// ): Map<string, T[]> {
//     const raws = new Map();
//     const keys: string[] = [];

//     if (alias.metadata.tableType === 'view') {
//         keys.push(
//             ...alias.metadata.columns.map((column) =>
//                 DriverUtils.buildAlias(driver, alias.name, column.databaseName),
//             ),
//         );
//     } else {
//         keys.push(
//             ...alias.metadata.primaryColumns.map((column) =>
//                 DriverUtils.buildAlias(driver, alias.name, column.databaseName),
//             ),
//         );
//     }

//     for (const rawResult of rawResults) {
//         const id = keys
//             .map((key) => {
//                 const keyValue = rawResult[key];

//                 if (Buffer.isBuffer(keyValue)) {
//                     return keyValue.toString('hex');
//                 }

//                 if (typeof keyValue === 'object') {
//                     return JSON.stringify(keyValue);
//                 }

//                 return keyValue;
//             })
//             .join('_'); // todo: check partial

//         const items = raws.get(id);

//         if (!items) {
//             raws.set(id, [rawResult]);
//         } else {
//             items.push(rawResult);
//         }
//     }

//     return raws;
// }

declare global {
    // export type Uuid = string & { _uuidBrand: undefined };
    // interface Array<T> {
    //   toDtos<Dto extends AbstractDto>(this: T[], options?: unknown): Dto[];
    //   toPageDto<Dto extends AbstractDto>(
    //     this: T[],
    //     pageMetaDto: PageMetaDto,
    //     // FIXME make option type visible from entity
    //     options?: unknown,
    //   ): PageDto<Dto>;
    // }
}

declare module 'typeorm' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface QueryBuilder<Entity> {
        searchByString(q: string, columnNames: string[]): this;
    }

    interface SelectQueryBuilder<Entity> {
        // paginate(
        //   this: SelectQueryBuilder<Entity>,
        //   pageOptionsDto: PageOptionsDto,
        //   options?: Partial<{ takeAll: boolean }>,
        // ): Promise<[Entity[], PageMetaDto]>;
        // where(where: Brackets | ColumnOfEntity<Entity> | ((qb: this) => string) | ObjectLiteral | ObjectLiteral[], parameters?: ObjectLiteral): this;

        select(
            selection: string,
            selectionAliasName?: ColumnOfEntity<Entity>,
        ): this;

        addSelect(
            selection: string,
            selectionAliasName?: ColumnOfEntity<Entity>,
        ): this;

        leftJoinAndSelect<AliasEntity extends BaseEntity, A extends string>(
            this: SelectQueryBuilder<Entity>,
            property: `${A}.${Exclude<
                KeyOfType<AliasEntity, BaseEntity>,
                symbol
            >}`,
            alias: string,
            condition?: string,
            parameters?: ObjectLiteral,
        ): this;

        leftJoin<AliasEntity extends BaseEntity, A extends string>(
            this: SelectQueryBuilder<Entity>,
            property: `${A}.${Exclude<
                KeyOfType<AliasEntity, BaseEntity>,
                symbol
            >}`,
            alias: string,
            condition?: string,
            parameters?: ObjectLiteral,
        ): this;

        innerJoinAndSelect<AliasEntity extends BaseEntity, A extends string>(
            this: SelectQueryBuilder<Entity>,
            property: `${A}.${Exclude<
                KeyOfType<AliasEntity, BaseEntity>,
                symbol
            >}`,
            alias: string,
            condition?: string,
            parameters?: ObjectLiteral,
        ): this;

        innerJoin<AliasEntity extends BaseEntity, A extends string>(
            this: SelectQueryBuilder<Entity>,
            property: `${A}.${Exclude<
                KeyOfType<AliasEntity, BaseEntity>,
                symbol
            >}`,
            alias: string,
            condition?: string,
            parameters?: ObjectLiteral,
        ): this;
    }
}

// Array.prototype.toDtos = function <
//   Entity extends BaseEntity<Dto>,
//   Dto extends AbstractDto,
// >(options?: unknown): Dto[] {
//   return compact(
//     map<Entity, Dto>(this as Entity[], (item) => item.toDto(options as never)),
//   );
// };

// Array.prototype.toPageDto = function (
//   pageMetaDto: PageMetaDto,
//   options?: unknown,
// ) {
//   return new PageDto(this.toDtos(options), pageMetaDto);
// };

QueryBuilder.prototype.searchByString = function (q, columnNames) {
    if (!q) {
        return this;
    }

    this.andWhere(
        new Brackets((qb) => {
            for (const item of columnNames) {
                qb.orWhere(`${item} ILIKE :q`);
            }
        }),
    );

    this.setParameter('q', `%${q}%`);

    return this;
};

// SelectQueryBuilder.prototype.paginate = async function (
//   pageOptionsDto: PageOptionsDto,
//   options?: Partial<{ takeAll: boolean }>,
// ) {
//   if (!options?.takeAll) {
//     this.skip(pageOptionsDto.skip).take(pageOptionsDto.take);
//   }

//   const itemCount = await this.getCount();

//   const { entities, raw } = await this.getRawAndEntities();

//   const alias = this.expressionMap.mainAlias!;
//   const group = groupRows(raw, alias, this.connection.driver);

//   const keys = alias.metadata.primaryColumns.map((column) =>
//     DriverUtils.buildAlias(
//       this.connection.driver,
//       alias.name,
//       column.databaseName,
//     ),
//   );

//   for (const rawValue of raw) {
//     const id = keys
//       .map((key) => {
//         const keyValue = rawValue[key];

//         if (Buffer.isBuffer(keyValue)) {
//           return keyValue.toString('hex');
//         }

//         if (typeof keyValue === 'object') {
//           return JSON.stringify(keyValue);
//         }

//         return keyValue;
//       })
//       .join('_');

//     const entity = entities.find((item) => item.id === id) as BaseEntity;
//     const metaInfo: Record<string, string> =
//       Reflect.getMetadata(VIRTUAL_COLUMN_KEY, entity) ?? {};

//     for (const [propertyKey, name] of Object.entries<string>(metaInfo)) {
//       const items = group.get(id);

//       if (items) {
//         for (const item of items) {
//           entity[propertyKey] ??= item[name];
//         }
//       }
//     }
//   }

//   const pageMetaDto = new PageMetaDto({
//     itemCount,
//     pageOptionsDto,
//   });

//   return [entities, pageMetaDto];
// };
