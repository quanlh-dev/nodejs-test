import './common/boilerplate.polyfill';
import './plugins/lodash';
import 'config';
import { Enviroment, SWAGGER_BEARER_AUTH_NAME } from './common/constants';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import express from 'express';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import ConfigKey from '../src/common/config/config-key';
import {
    DocumentBuilder,
    SwaggerCustomOptions,
    SwaggerModule,
} from '@nestjs/swagger';
import { JoiValidationPipe } from '~common';
import { middleware as expressCtx } from 'express-ctx';
import { setupDev } from '~plugins';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(helmet());
    // set up CORS
    const configService: ConfigService = app.get(ConfigService);
    const corsOptions: CorsOptions = {
        origin: configService.get(ConfigKey.CORS_WHITE_LIST),
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'accept-language',
            'X-Timezone',
            'X-Timezone-Name',
        ],
        optionsSuccessStatus: 200,
        methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    };
    app.enableCors(corsOptions);
    // setup prefix of route
    app.setGlobalPrefix(configService.get(ConfigKey.BASE_PATH));

    app.useGlobalPipes(new JoiValidationPipe());

    // app.useGlobalPipes(
    //     new ValidationPipe({
    //         whitelist: true,
    //         transform: false,
    //         dismissDefaultMessages: true,
    //         exceptionFactory: (errors) => new ValidationException(errors),
    //     }),
    // );

    // setup max request size
    app.use(
        express.json({ limit: configService.get(ConfigKey.MAX_REQUEST_SIZE) }),
    );
    app.use(
        express.urlencoded({
            limit: configService.get(ConfigKey.MAX_REQUEST_SIZE),
            extended: true,
        }),
    );
    // use winston for logger
    // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

    // setup context provider
    app.use(expressCtx);

    // setup for development mode
    // swagger ui
    if (configService.get(ConfigKey.NODE_ENV) === Enviroment.DEVELOPMENT) {
        const config = new DocumentBuilder()
            .setTitle('Example')
            .setDescription('API description')
            .setVersion('1.0')
            .addBearerAuth(
                {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    name: 'JWT',
                    description: 'Enter JWT token',
                    in: 'header',
                },
                SWAGGER_BEARER_AUTH_NAME,
            )
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

        setupDev();
    }

    await app.listen(configService.get(ConfigKey.PORT));
}

bootstrap();
