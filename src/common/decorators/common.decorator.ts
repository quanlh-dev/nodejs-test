import { METADATA_KEY, IRequest } from '~common';
import {
    PERMISSION_ACTION,
    PERMISSION_RESOURCE,
    SWAGGER_BEARER_AUTH_NAME,
} from '~common';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import {
    applyDecorators,
    createParamDecorator,
    ExecutionContext,
    SetMetadata,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export type PermissionType =
    | `${PERMISSION_ACTION}_${PERMISSION_RESOURCE}`
    // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
    | String;
export type AuthOptions = { isPublic?: boolean };
export function Auth(
    permissions?: PermissionType[],
    options?: AuthOptions,
): MethodDecorator {
    return applyDecorators(
        SetMetadata(METADATA_KEY.PERMISSIONS, permissions ?? []),
        SetMetadata(METADATA_KEY.AUTH_OPTIONS, options ?? {}),
        UseGuards(JwtGuard, AuthorizationGuard),
        ApiBearerAuth(SWAGGER_BEARER_AUTH_NAME),
        UseInterceptors(),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}

export const AuthUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest() as IRequest;

        const user = request?.authUser;

        return user;
    },
);

export function OmitProperty(): PropertyDecorator {
    // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
    return (target: Object, propertyKey: string | symbol) => {
        const existMetaData =
            Reflect.getMetadata(METADATA_KEY.OMIT_PROPERTY, target) ?? [];
        existMetaData.push(propertyKey);
        Reflect.defineMetadata(
            METADATA_KEY.OMIT_PROPERTY,
            existMetaData,
            target,
        );
    };
}
