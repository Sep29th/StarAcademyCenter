import { BullModuleOptions, SharedBullAsyncConfiguration } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';

export class QueueConfig implements SharedBullAsyncConfiguration {
  inject?: any[] = [ConfigService];

  useFactory = (configService: ConfigService): BullModuleOptions => ({
    url: configService.get('REDIS_URL'),
  });

  private static instance: QueueConfig;

  static getInstance(): QueueConfig {
    return this.instance ?? (this.instance = new QueueConfig());
  }
}
