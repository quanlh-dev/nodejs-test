import { IRequest } from '~common';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class CommonService {
    constructor(
        @Inject(REQUEST)
        readonly request: IRequest,
    ) {}
}
