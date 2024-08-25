import BaseJoi from 'joi';
import JoiDate from '@joi/date';
import { ValidationKey, I18Key } from '~i18n';

const Joi: typeof BaseJoi = BaseJoi.extend(JoiDate);

export function wrapJoiMessage(mess: string): string {
    return `JOI[${mess}]`;
}

export function unwrapJoiMessage(mess: string): string | undefined {
    return mess.match(/JOI\[(.*)\]/)?.[1];
}

export type JoiMessageType = {
    [key in ValidationKey]?: I18Key;
};

export class JoiMessage {
    constructor(messages: JoiMessageType) {
        for (const key in messages) {
            this[key] = wrapJoiMessage(messages[key]);
        }
    }
}

export { Joi };
