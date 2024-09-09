import BaseJoi from 'joi';

const Joi: typeof BaseJoi = BaseJoi;

export function wrapJoiMessage(mess: string): string {
    return `JOI[${mess}]`;
}

export function unwrapJoiMessage(mess: string): string | undefined {
    return mess.match(/JOI\[(.*)\]/)?.[1];
}

export { Joi };
