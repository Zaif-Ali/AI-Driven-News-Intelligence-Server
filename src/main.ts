import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import helmet from 'helmet';
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import compression from 'compression';
import morgan from 'morgan';
import { RequestTransformInterceptor } from './interceptors/request-transform.interceptor';
import { HTTPExceptionFilter } from './filters/http-exception.filter';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fs from 'fs';
import { Request, Response } from 'express';

async function bootstrap() {
  // create a nest application with the Express application
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );

  const configService = app.select(SharedModule).get(ApiConfigService);

  // Enable CORS
  app.enableCors({
    // origin:
    //   configService.getCorsOrigins() === '*'
    //     ? true
    //     : configService.getCorsOrigins(),
    origin: (origin, callback) => {
      const allowed = configService.getCorsOrigins();
      if (allowed === '*' || (origin && allowed.includes(origin))) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed for this origin'));
      }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });

  // Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.get('APPLICATION_NAME'))
    .setDescription(
      `Swagger API documentation for ${configService.get('APPLICATION_NAME')}`,
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // Swagger setup only in non-production environments
  if (!configService.isProduction) {
    SwaggerModule.setup(configService.get('SWAGGER_API_PATH'), app, document);
  }

  // OpenAI JSON API setup only in non-production environments
  if (!configService.isProduction) {
    fs.writeFileSync(
      './swagger-api.json',
      JSON.stringify(document, null, 2),
      'utf-8',
    );

    // Serve the OpenAI JSON API at /swagger-api
    app
      .getHttpAdapter()
      .getInstance()
      .get('/swagger-api', (_req: Request, res: Response) => {
        res.json(document);
      });
  }
  // Express Application Middlewares
  app.enable('trust proxy');
  app.use(helmet());
  app.use(compression());
  app.use(morgan('combined'));

  app.setGlobalPrefix(configService.get('API_PREFIX'));

  app.useGlobalFilters(
    new HTTPExceptionFilter(),
    new ValidationExceptionFilter(),
  );

  app.useGlobalInterceptors(new RequestTransformInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(configService.get('PORT'));
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
