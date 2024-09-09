import { FieldEntity } from 'src/common/entites/field.entity';
import { ResponseDto } from './../../../../common/base/dto.base';

export class FieldResponseDto extends ResponseDto {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;
    offsetFrom?: number;
    offsetTo?: number;
    description?: string;
    name?: string;
    type?: string;

    constructor(field?: FieldEntity) {
        super();
        this.id = field?.id;
        this.createdAt = field?.createdAt;
        this.updatedAt = field?.updatedAt;
        this.createdBy = field?.createdBy;
        this.updatedBy = field?.updatedBy;
        this.offsetFrom = field?.offsetFrom;
        this.offsetTo = field?.offsetTo;
        this.description = field?.description;
        this.name = field?.name;
        this.type = field?.type;
    }
}
