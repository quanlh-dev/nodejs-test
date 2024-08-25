import { PermissionType } from './../decorators/common.decorator';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { METADATA_KEY, IRequest } from '~common';
import _ from 'lodash';
@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const needPermissions = this.reflector.get<PermissionType[]>(
            METADATA_KEY.PERMISSIONS,
            context.getHandler(),
        );

        if (!needPermissions || needPermissions?.length === 0) {
            return true;
        }
        const request = context.switchToHttp().getRequest() as IRequest;
        const resourceWithActions = request?.authUser?.resourceWithActions;
        const avaiablePermissions: PermissionType[] = [];

        for (const resource in resourceWithActions) {
            if (resourceWithActions.hasOwnProperty(resource)) {
                avaiablePermissions.push(
                    ...(resourceWithActions[resource]?.map(
                        (action) => `${action}_${resource}`,
                    ) ?? []),
                );
            }
        }

        const needPermissionsRaw: PermissionType[] = [];
        needPermissions.forEach((permission) => {
            needPermissionsRaw.push(...this.convertPermission(permission));
        });

        const avaiablePermissionsRaw: PermissionType[] = [];
        avaiablePermissions.forEach((permission) => {
            avaiablePermissionsRaw.push(...this.convertPermission(permission));
        });

        // checkif user has avaiable permissions contains need permissions to access this resource
        return (
            _.difference(
                _.uniq(needPermissionsRaw),
                _.uniq(avaiablePermissionsRaw),
            ).length === 0
        );
    }

    convertPermission(permission: PermissionType): PermissionType[] {
        const action = permission.split('_')[0];
        const resource = permission.split('_')[1];
        return [permission];
    }
}
