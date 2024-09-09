import { METADATA_KEY } from '~common';
import BaseJoi from 'joi';

export class RequestDto {
    constructor() {
        //
    }

    static getJoiSchema() {
        const joiObjectSchema: BaseJoi.PartialSchemaMap = this.getJoiObject();
        return BaseJoi.object(joiObjectSchema);
    }

    static getJoiObject() {
        return Reflect.getMetadata(METADATA_KEY.JOI, this.prototype) ?? {};
    }
}

export class QueryParamDto extends RequestDto {}
export class RequestBodyDto extends RequestDto {}
export class ResponseDto {
    constructor() {
        // TODO:
    }
}
