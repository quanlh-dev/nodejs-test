import { IMeta } from '~common';
import { CommonListResponse } from 'src/common/helpers/api.response';

import { FieldEntity } from 'src/common/entites/field.entity';
import { FieldResponseDto } from './field.response.dto';

export class FieldListDto extends CommonListResponse<FieldResponseDto> {
    constructor(entities?: FieldEntity[], meta?: IMeta) {
        super();
        this.meta = meta;
        this.items = entities?.map((e) => new FieldResponseDto(e)) ?? [];
    }
}
