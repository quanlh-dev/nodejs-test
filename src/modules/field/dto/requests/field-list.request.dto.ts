import {
    JoiArray,
    Limit,
    OrderBy,
    OrderDirection,
    Page,
    QueryParamDto,
    SearchKeyword,
} from '~common';

import * as Joi from 'joi';
import { ORDER_DIRECTION } from 'src/common/constants/common.constants';
import { FieldType } from '../../field.constant';

export class FieldListQueryStringDto extends QueryParamDto {
    @Page()
    page: number;

    @Limit()
    limit: number;

    @SearchKeyword()
    keyword: string;

    @OrderBy()
    orderBy: string;

    @OrderDirection()
    orderDirection: ORDER_DIRECTION;

    @JoiArray(FieldType, Joi.array().default(Object.values(FieldType)))
    types?: FieldType[];
}
