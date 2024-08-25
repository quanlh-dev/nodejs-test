export enum LANGUAGES {
    EN = 'en',
    VI = 'vi',
}

export enum Enviroment {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    TEST = 'test',
    PROVISION = 'provision',
}

export enum ORDER_DIRECTION {
    ASC = 'ASC',
    DESC = 'DESC',
}
export type TYPE_ORM_ORDER_DIRECTION = 'ASC' | 'DESC';

export enum DATE_FORMAT {
    YYYY_MM_DD_HYPHEN = 'YYYY-MM-DD',
}

// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
export type ColumnOfEntity<T> = keyof T | String;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Criteria<T> = string | string[] | number | number[] | Date | Date[];
// | ObjectID
// | ObjectID[]
// | FindConditions<T>;

export type ColumnOfEntityWithAlias<T> = {
    alias: string;
    columns: ColumnOfEntity<T>[] | ColumnOfEntity<T> | '*';
};

export type PickRequired<T, K extends keyof T> = {
    [P in K]-?: T[P];
};

export type PickOptional<T, K extends keyof T> = {
    [P in K]?: T[P];
};

export const APPROVED = { TRUE: 1, FALSE: 0 };

export const DEFAULT_FIRST_PAGE = 1;
export const DEFAULT_LIMIT_FOR_DROPDOWN = 1000;
export const DEFAULT_LIMIT_FOR_PAGINATION = 10;
export const DEFAULT_ORDER_BY = 'createdAt';
export const DEFAULT_ORDER_DIRECTION = ORDER_DIRECTION.ASC;

export const MIN_ID = 1;
export const MIN_LIMIT = 1;
export const MIN_PAGE = 1;
export const MAX_LIMIT = 100;
export const MAX_PAGE = 100;
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 5;
export const MAX_LENGTH_SEARCH_KEYWORD = 255;

export const BIRTHDAY_MIN_DATE = '1800-01-01';

export const INPUT_TEXT_MAX_LENGTH = 255;
export const INPUT_PHONE_MAX_LENGTH = 11;

export const TEXTAREA_MAX_LENGTH = 2000;

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,20}$/;

export const PHONE_NUMBER_REGEX = /^(\d*).{10,11}$/;

export const YYYY_MM_REGEX = /^\d{4}-(0[1-9]|1[0-2])$/;
export const FULL_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const TIME_FORMAT = 'HH:mm:ss';

export const SECONDS_PER_DAY = 86400;

export const SECONDS_PER_FIVE_DAYS = 5 * SECONDS_PER_DAY;

export const MAX_CITIZEN_ID_LENGTH = 12;
export const MIN_CITIZEN_ID_LENGTH = 9;

export const MAX_BANK_ACCOUNT_LENGTH = 14;
export const MIN_BANK_ACCOUNT_LENGTH = 9;

export const MAX_SOCIAL_INSURANCE_LENGTH = 13;
export const MIN_SOCIAL_INSURANCE_LENGTH = 10;

export const MAX_TAX_CODE_LENGTH = 13;
export const MIN_TAX_CODE_LENGTH = 10;

export const MAX_LENGTH_DAYS_OF_MONTH = 31;

export const MAX_LENGTH_MONTH = 12;
export const MIN_LENGTH_MONTH = 1;
export const URL_REGEX =
    /^https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/;

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

export const TIMEZONE_HEADER = 'x-timezone';
export const TIMEZONE_DEFAULT = '+07:00';
export const TIMEZONE_NAME_HEADER = 'x-timezone-name';
export const TIMEZONE_NAME_DEFAULT = 'Asia/Bangkok';
export const METADATA_KEY = {
    JOI: Symbol('_joi_'),
    ROLES: Symbol('_roles_'),
    PERMISSIONS: Symbol('_permissions_'),
    AUTH_OPTIONS: Symbol('_auth_options_'),
    OMIT_PROPERTY: Symbol('_omit_property_'),
    VIRTUAL_COLUMN: Symbol('VIRTUAL_COLUMN'),
};

export const SWAGGER_BEARER_AUTH_NAME = 'Bearer Token';

export enum Sex {
    MALE = 0,
    FEMALE = 1,
    OTHER = 2,
}

export enum CustomerStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    UNVERIFIED = 'unverified',
}

export enum ComplaintStatus {
    PENDING = 'pending',
    RESOLVED = 'resolved',
    REJECTED = 'rejected',
}
