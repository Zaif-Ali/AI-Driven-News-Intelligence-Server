import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { envConfiguration } from './config/env.config';
import { ConfigModule } from '@nestjs/config';
import { ApiConfigService } from './shared/services/api-config.service';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { NewsModule } from './modules/news/news.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/secrets/.env.${process.env.NODE_ENV}`,
      load: [envConfiguration],
      isGlobal: true,
    }),
    SharedModule,
    DatabaseModule,
    ThrottlerModule.forRootAsync({
      imports: [SharedModule],
      inject: [ApiConfigService],
      useFactory: (apiConfigService: ApiConfigService) => ({
        throttlers: [
          {
            limit: apiConfigService.get('RATE_LIMITER_LIMIT'),
            ttl: apiConfigService.get('RATE_LIMITER_TTL'),
          },
        ],
      }),
    }),
    NewsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
