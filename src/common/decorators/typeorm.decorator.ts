import {
    ObjectType,
    OneToMany as TypeOrmOneToMany,
    OneToOne as TypeOrmOneToOne,
    ManyToMany as TypeOrmManyToMany,
    ManyToOne as TypeOrmManyToOne,
    RelationOptions,
} from 'typeorm';
import { defaultTypeOrmRelationOptions } from '../constants/database.constant';

/**
 * A one-to-many relation allows creating the type of relation where Entity1 can have multiple instances of Entity2,
 * but Entity2 has only one Entity1. Entity2 is the owner of the relationship, and stores the id of Entity1 on its
 * side of the relation.
 */
export function OneToMany<T>(
    typeFunctionOrTarget: string | ((type?: any) => ObjectType<T>),
    inverseSide: string | ((object: T) => any),
    options?: RelationOptions,
): PropertyDecorator {
    return TypeOrmOneToMany(typeFunctionOrTarget, inverseSide, {
        ...defaultTypeOrmRelationOptions,
        ...options,
    });
}

/**
 * One-to-one relation allows to create direct relation between two entities. Entity1 have only one Entity2.
 * Entity1 is an owner of the relationship, and storages Entity1 id on its own side.
 */
export function OneToOne<T>(
    typeFunctionOrTarget: string | ((type?: any) => ObjectType<T>),
    inverseSide?: string | ((object: T) => any),
    options?: RelationOptions,
): PropertyDecorator {
    return TypeOrmOneToOne(typeFunctionOrTarget, inverseSide, {
        ...defaultTypeOrmRelationOptions,
        ...options,
    });
}

/**
 * Many-to-many is a type of relationship when Entity1 can have multiple instances of Entity2, and Entity2 can have
 * multiple instances of Entity1. To achieve it, this type of relation creates a junction table, where it storage
 * entity1 and entity2 ids. This is owner side of the relationship.
 */
export function ManyToMany<T>(
    typeFunctionOrTarget: string | ((type?: any) => ObjectType<T>),
    inverseSide?: string | ((object: T) => any),
    options?: RelationOptions,
): PropertyDecorator {
    return TypeOrmManyToMany(typeFunctionOrTarget, inverseSide, {
        ...defaultTypeOrmRelationOptions,
        ...options,
    });
}

/**
 * A many-to-one relation allows creating the type of relation where Entity1 can have a single instance of Entity2, but
 * Entity2 can have multiple instances of Entity1. Entity1 is the owner of the relationship, and stores the id of
 * Entity2 on its side of the relation.
 */
export function ManyToOne<T>(
    typeFunctionOrTarget: string | ((type?: any) => ObjectType<T>),
    inverseSide?: string | ((object: T) => any),
    options?: RelationOptions,
): PropertyDecorator {
    return TypeOrmManyToOne(typeFunctionOrTarget, inverseSide, {
        ...defaultTypeOrmRelationOptions,
        ...options,
    });
}
