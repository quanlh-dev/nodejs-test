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

    constructor(user?: FieldEntity) {
        super();
        // this.user = user;
        this.id = user?.id;
        this.createdAt = user?.createdAt;
        this.updatedAt = user?.updatedAt;
        this.createdBy = user?.createdBy;
        this.updatedBy = user?.updatedBy;
        this.offsetFrom = user?.offsetFrom;
        this.offsetTo = user?.offsetTo;
        this.description = user?.description;
        this.name = user?.name;
        this.type = user?.type;
    }
}
