import { DataSourceOptions } from 'typeorm';
import config from '~config/index';
console.log('🚀 ~ config:', config);
// import glob from 'glob';

// export async function getSeeds() {
//     try {
//         const files = await glob(`database/seedings/**/*.seed.ts`, {});
//     } catch (error) {
//         console.log(error);
//     }
// }
// getSeeds();

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
        // cli: { migrationsDir: 'database/migrations' },
    },
    // {
    //     name: 'seed',
    //     type: 'mysql',
    //     database: DB.NAME,
    //     port: parseInt(DB.PORT as any) || 3306,
    //     username: DB.USERNAME,
    //     password: DB.PASSWORD,
    //     host: DB.HOST,
    //     socketPath: null,
    //     synchronize: false,
    //     migrationsRun: false,
    //     charset: 'utf8mb4_unicode_ci',
    //     entities: ['src/**/*.entity{.ts,.js}'],
    //     migrations: ['database/seedings/**/*{.ts,.js}'],
    //     // cli: {
    //     //     migrationsDir: 'database/seedings',
    //     // },
    // },
];

export default DatabaseConfig;
