import { METADATA_KEY } from '~common';
import BaseJoi from 'joi';

export class RequestDto {
    constructor() {
        console.log('');
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
        console.log('');
    }

    static getOmitProperties(): string[] {
        return (
            Reflect.getMetadata(METADATA_KEY.OMIT_PROPERTY, this.prototype) ??
            []
        );
    }
}
