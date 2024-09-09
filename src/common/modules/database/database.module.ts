import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConfig } from 'database/config';
import { FileLogger } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DatabaseService, Enviroment } from '~common';
import ConfigKey from '../../config/config-key';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const postgresDatabase = DatabaseConfig.find(
                    (item) => item.type === 'postgres',
                );
                const { database, port, username, password, host } =
                    postgresDatabase as PostgresConnectionOptions;
                const isDevelopment =
                    configService.get(ConfigKey.NODE_ENV) ===
                    Enviroment.DEVELOPMENT;
                const isLocal =
                    configService.get(ConfigKey.NODE_ENV) === Enviroment.LOCAL;
                const options: TypeOrmModuleOptions = {
                    name: 'default',
                    type: 'postgres',
                    host,
                    port,
                    username,
                    password,
                    database,
                    autoLoadEntities: true,
                    entities: ['dist/src/**/*.entity{.ts,.js}'],
                    logger: new FileLogger(isDevelopment, {
                        logPath: 'logs/query.log',
                    }),
                    synchronize: false,
                };

                if (!isLocal) {
                    options['extra' as any] = {
                        ssl: {
                            rejectUnauthorized: false,
                        },
                    };
                }

                return options;
            },
        }),
    ],
    providers: [DatabaseService],
    exports: [DatabaseService],
})
export class DatabaseModule {}
