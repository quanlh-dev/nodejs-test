import { FieldEntity } from 'src/common/entites/field.entity';
import { ResponseDto } from './../../../../common/base/dto.base';

export class FieldResponseDto extends ResponseDto {
    id: number;
    offsetFrom?: number;
    offsetTo?: number;
    description?: string;
    name?: string;
    type?: string;

    constructor(field?: FieldEntity) {
        super();
        this.id = field?.id;
        this.offsetFrom = field?.offsetFrom;
        this.offsetTo = field?.offsetTo;
        this.description = field?.description;
        this.name = field?.name;
        this.type = field?.type;
    }
}
