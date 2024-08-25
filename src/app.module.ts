import { DatabaseModule } from './common/modules/database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '~config/configuration';
import { FieldModule } from './modules/field/field.module';
import { I18nModule } from './common/modules/i18n/i18n.module';
import { CommonModule } from '~common';
import { WinstonModule } from './common/modules/winston/winston.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        CommonModule,
        WinstonModule,
        DatabaseModule,
        FieldModule,
        I18nModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
