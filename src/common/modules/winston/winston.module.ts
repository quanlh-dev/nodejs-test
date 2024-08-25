import { WinstonModule as NestWinstonModule } from 'nest-winston';
import { ConfigModule, ConfigService } from '@nestjs/config';

import * as winston from 'winston';
import 'winston-daily-rotate-file';
import ConfigKey from '../../config/config-key';
import { Module } from '@nestjs/common';
import { LOG_LEVEL, Enviroment } from '~common';

export function createWinstonLogger(
    filename: string,
    configService: ConfigService,
) {
    return winston.createLogger({
        level: configService.get(ConfigKey.LOG_LEVEL),
        format: winston.format.json(),
        defaultMeta: { service: filename },
        transports: [
            new winston.transports.Console({
                level:
                    configService.get(ConfigKey.NODE_ENV) ===
                    Enviroment.PRODUCTION
                        ? LOG_LEVEL.ERROR
                        : LOG_LEVEL.DEBUG,
            }),
            // new winston.transports.DailyRotateFile({
            //     filename: `${configService.get(
            //         ConfigKey.LOG_ROOT_FOLDER,
            //     )}/${filename}-%DATE%.log`,
            //     datePattern: 'YYYY-MM-DD-HH',
            //     zippedArchive: true,
            //     maxSize: '20m',
            //     maxFiles: '14d',
            // }),
        ],
    });
}

@Module({
    imports: [
        NestWinstonModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return createWinstonLogger('app', configService);
            },
        }),
    ],
    providers: [],
})
export class WinstonModule {}
