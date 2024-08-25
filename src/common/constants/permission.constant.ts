export enum PERMISSION_RESOURCE {
    SERVICE_TYPE = 'service_type',
}

export enum PERMISSION_ACTION {
    READ = 'read',
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
    LOGIN = 'login',
    READ_ALL = 'read_all',
    UPDATE_STATUS = 'update_status',
}

export enum ROLE_TYPE {
    MANAGER = 'manager',
}

export enum UserTokenType {
    REFRESH_TOKEN = 'refresh_token',
    ACCESS_TOKEN = 'access_token',
}
