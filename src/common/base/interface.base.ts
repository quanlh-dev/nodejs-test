import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { ROLE_TYPE } from '../constants';

export type ResourceWithActions = Record<string, string[]>;

export interface LoginUser {
    email: string;
    id: number;
    resourceWithActions: ResourceWithActions;
    roles: Record<string, any>[];
    expiresIn: number;
}

export type IAuthUser = LoginUser & JwtPayload;

export class AuthenticatedUser implements IAuthUser {
    email: string;
    id: number;
    resourceWithActions: ResourceWithActions;
    roles: Record<string, any>[];
    expiresIn: number;
    iss?: string;
    sub?: string;
    aud?: string | string[];
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;

    get isAdministrator(): boolean {
        return !!this.roles.find((role) => role.name === ROLE_TYPE.MANAGER);
    }

    constructor(authUser?: IAuthUser) {
        for (const key in authUser) {
            this[key] = authUser[key];
        }
    }
}
export interface IRequest extends Request {
    authUser?: IAuthUser;
}
