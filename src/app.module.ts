import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '~config/configuration';
import { DatabaseModule } from './common/modules/database/database.module';
import { FieldModule } from './modules/field/field.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        DatabaseModule,
        FieldModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
