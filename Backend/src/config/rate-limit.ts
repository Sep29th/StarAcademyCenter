import {
  ThrottlerAsyncOptions,
  ThrottlerModuleOptions,
} from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';

export class RateLimitConfig implements ThrottlerAsyncOptions {
  private constructor() {}

  inject?: any[] = [ConfigService];

  useFactory = (configService: ConfigService): ThrottlerModuleOptions => ({
    throttlers: [
      {
        name: 'short',
        ttl: configService.get<number>('RATE_LIMIT_TIME_SHORT'),
        limit: configService.get<number>('RATE_LIMIT_REQUEST_SHORT'),
      },
      {
        name: 'medium',
        ttl: configService.get<number>('RATE_LIMIT_TIME_MEDIUM'),
        limit: configService.get<number>('RATE_LIMIT_REQUEST_MEDIUM'),
      },
      {
        name: 'long',
        ttl: configService.get<number>('RATE_LIMIT_TIME_LONG'),
        limit: configService.get<number>('RATE_LIMIT_REQUEST_LONG'),
      },
    ],
    storage: new ThrottlerStorageRedisService(configService.get('REDIS_URL')),
  });

  private static instance: RateLimitConfig;

  static getInstance(): RateLimitConfig {
    return this.instance ?? (this.instance = new RateLimitConfig());
  }
}
