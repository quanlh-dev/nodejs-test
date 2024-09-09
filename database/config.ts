import { DataSourceOptions } from 'typeorm';
import config from '~config/index';
console.log('🚀 ~ config:', config);

export const DatabaseConfig: DataSourceOptions[] = [
    {
        name: 'default',
        type: 'postgres',
        database: config.DB_NAME,
        port: parseInt(config.DB_PORT as any) || 5432,
        username: config.DB_USERNAME,
        password: config.DB_PASSWORD,
        host: config.DB_HOST,
        synchronize: false,
        migrationsRun: false,
        entities: ['src/**/*.entity{.ts,.js}'],
        migrations: ['database/migrations/**/*{.ts,.js}'],
    },
];

export default DatabaseConfig;
