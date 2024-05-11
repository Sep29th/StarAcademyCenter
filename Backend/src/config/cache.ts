import {
  CacheModuleAsyncOptions,
  CacheModuleOptions,
} from 'nestjs-cache-redis';
import { ConfigService } from '@nestjs/config';
import { Bool } from '../common/helper/bool';

export class CacheConfig implements CacheModuleAsyncOptions {
  private constructor() {}
  isGlobal?: boolean = true;
  injects?: any[] = [ConfigService, Bool];
  useFactory? = (
    configService: ConfigService,
    bool: Bool,
  ): CacheModuleOptions => ({
    url: configService.get('REDIS_URL'),
    FIFO: {
      ttl: +configService.get('FIFO_TTL'),
      max: +configService.get('FIFO_MAX'),
      resetExpires: bool.parse(configService.get('FIFO_RESET_EXPIRES')),
    },
    LRU: {
      ttl: +configService.get('LRU_TTL'),
      max: +configService.get('LRU_MAX'),
      resetExpires: bool.parse(configService.get('LRU_RESET_EXPIRES')),
    },
    LFU: {
      ttl: +configService.get('LFU_TTL'),
      max: +configService.get('LFU_MAX'),
      resetExpires: bool.parse(configService.get('LFU_RESET_EXPIRES')),
    },
  });
  private static instance: CacheConfig;

  static getInstance(): CacheConfig {
    return this.instance ?? (this.instance = new CacheConfig());
  }
}
