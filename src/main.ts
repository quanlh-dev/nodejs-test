import { Enviroment } from './common/constants';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import ConfigKey from '../src/common/config/config-key';
import {
    DocumentBuilder,
    SwaggerCustomOptions,
    SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const configService: ConfigService = app.get(ConfigService);

    const corsOptions: CorsOptions = {
        origin: '*',
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'accept-language',
            'X-Timezone',
            'X-Timezone-Name',
        ],
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST'],
    };
    app.enableCors(corsOptions);

    // setup for development mode
    // swagger ui
    if (configService.get(ConfigKey.NODE_ENV) === Enviroment.DEVELOPMENT) {
        const config = new DocumentBuilder()
            .setTitle('Example')
            .setDescription('API description')
            .setVersion('1.0')
            .addTag('example')
            .build();
        const document = SwaggerModule.createDocument(app, config);
        const SWAGGER_PATH = '/swagger';
        const options: SwaggerCustomOptions = {
            swaggerOptions: {
                persistAuthorization: true,
            },
        };
        SwaggerModule.setup(SWAGGER_PATH, app, document, options);
        console.log(
            `[Swagger UI is available at http://localhost:${configService.get(
                ConfigKey.PORT,
            )}${SWAGGER_PATH}]`,
        );
    }

    await app.listen(configService.get(ConfigKey.PORT));
}

bootstrap();
