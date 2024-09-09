export enum LANGUAGES {
    EN = 'en',
    VI = 'vi',
}

export enum Enviroment {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    TEST = 'test',
    LOCAL = 'local',
}

export enum ORDER_DIRECTION {
    ASC = 'ASC',
    DESC = 'DESC',
}

// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
export type ColumnOfEntity<T> = keyof T | String;

export type ColumnOfEntityWithAlias<T> = {
    alias: string;
    columns: ColumnOfEntity<T>[] | ColumnOfEntity<T> | '*';
};

export const DEFAULT_ORDER_BY = 'createdAt';
export const DEFAULT_ORDER_DIRECTION = ORDER_DIRECTION.ASC;

export const MIN_LIMIT = 1;
export const MIN_PAGE = 1;
export const MAX_LIMIT = 100;
export const MAX_PAGE = 100;
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 5;
export const MAX_LENGTH_SEARCH_KEYWORD = 255;

export enum LOG_LEVEL {
    DEBUG = 'debug',
    ALL = 'all',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    FATAL = 'fatal',
    OFF = 'off',
    TRACE = 'trace',
}

export const INPUT_TEXT_MAX_LENGTH = 255;

export const TEXTAREA_MAX_LENGTH = 2000;

export const METADATA_KEY = {
    JOI: Symbol('_joi_'),
};
