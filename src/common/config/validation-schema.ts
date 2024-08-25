import * as Joi from 'joi';
import ConfigKey from './config-key';
import { Enviroment, LOG_LEVEL } from '../constants';

export const envJoiSchema = Joi.object({
    [ConfigKey.NODE_ENV]: Joi.string()
        .required()
        .valid(
            Enviroment.DEVELOPMENT,
            Enviroment.PRODUCTION,
            Enviroment.PROVISION,
            Enviroment.TEST,
        ),
});

export const configJoiSchema = Joi.object({
    [ConfigKey.PORT]: Joi.number().default(3000),
    [ConfigKey.BASE_PATH]: Joi.string().required(),
    [ConfigKey.LOG_LEVEL]: Joi.string()
        .default(LOG_LEVEL.DEBUG)
        .valid(
            LOG_LEVEL.ALL,
            LOG_LEVEL.DEBUG,
            LOG_LEVEL.ERROR,
            LOG_LEVEL.FATAL,
            LOG_LEVEL.INFO,
            LOG_LEVEL.OFF,
            LOG_LEVEL.TRACE,
            LOG_LEVEL.WARN,
        ),
    [ConfigKey.LOG_ROOT_FOLDER]: Joi.string().default('logs'),
    [ConfigKey.DATABASE]: Joi.object({
        HOST: Joi.string().required(),
        PORT: Joi.number().required(),
        USERNAME: Joi.string().required(),
        PASSWORD: Joi.string().allow(null, ''),
        NAME: Joi.string().required(),
    }),

    [ConfigKey.JWT_SECRET_ACCESS_TOKEN_KEY]: Joi.string().required(),
    [ConfigKey.JWT_SECRET_REFRESH_TOKEN_KEY]: Joi.string().required(),
    [ConfigKey.TOKEN_EXPIRED_IN]: Joi.number().required(),
    [ConfigKey.REFRESH_TOKEN_EXPIRED_IN]: Joi.number().required(),
    [ConfigKey.CORS_WHITE_LIST]: Joi.string().required(),
    [ConfigKey.MAX_REQUEST_SIZE]: Joi.string().required(),
});
