import {
  ConfigurableModuleAsyncOptions,
  DynamicModule,
  ForwardReference,
  Type,
} from '@nestjs/common';
import { ExtraConfiguration, TwilioModuleOptions } from 'nestjs-twilio';
import { ConfigService } from '@nestjs/config';

export class SmsConfig
  implements
    ConfigurableModuleAsyncOptions<TwilioModuleOptions, 'create'>,
    Partial<ExtraConfiguration>
{
  imports: Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
  private constructor() {}

  isGlobal?: boolean = true;
  inject?: any[] = [ConfigService];
  useFactory = (configService: ConfigService): TwilioModuleOptions => ({
    accountSid: configService.get('TWILIO_ACCOUNT_SID'),
    authToken: configService.get('TWILIO_AUTH_TOKEN'),
  });

  private static instance: SmsConfig;
  static getInstance(): SmsConfig {
    return this.instance ?? (this.instance = new SmsConfig());
  }
}
