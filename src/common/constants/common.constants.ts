export enum Enviroment {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    TEST = 'test',
    LOCAL = 'local',
}

// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
export type ColumnOfEntity<T> = keyof T | String;

export type ColumnOfEntityWithAlias<T> = {
    alias: string;
    columns: ColumnOfEntity<T>[] | ColumnOfEntity<T> | '*';
};
