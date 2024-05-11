import 'reflect-metadata';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  INestApplication,
  NestApplicationOptions,
  ValidationPipe,
} from '@nestjs/common';
import { ascii } from './ascii';
import { WinstonModule } from 'nest-winston';
import { LoggerConfig } from './config/logger';
import { ErrorResponseFilter } from './common/filter/error-response.filter';
import { ConfigService } from '@nestjs/config';
import { SuccessResponseInterceptor } from './common/interceptor/success-response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import expressBasicAuth from 'express-basic-auth';
async function bootstrap(): Promise<void> {
  console.log(ascii);
  const configService: ConfigService = new ConfigService();
  const app: INestApplication = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(LoggerConfig.getInstance()),
  } as NestApplicationOptions);
  app.useGlobalFilters(new ErrorResponseFilter(app.get(HttpAdapterHost)));
  app.useGlobalInterceptors(new SuccessResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  configService.get('APP_ENV') === 'Development' &&
    app.use(
      '/api',
      expressBasicAuth({
        users: {
          [configService.get('API_DOCS_USERNAME')]:
            configService.get('API_DOCS_PASSWORD'),
        },
        challenge: true,
      }),
    ) &&
    SwaggerModule.setup(
      'api',
      app,
      SwaggerModule.createDocument(
        app,
        new DocumentBuilder()
          .addBearerAuth()
          .setTitle('Awesome Nestjs')
          .setDescription(
            'The Awesome Nestjs API description -- Created by Sep29th (LHC)',
          )
          .setVersion('1.0')
          .build(),
      ),
    );
  await app.listen(configService.get('APP_PORT'));
}

bootstrap().then();