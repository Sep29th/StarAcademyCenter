import { Module } from '@nestjs/common';
import { FeatureModule } from './modules/feature/feature.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigurationConfig } from './config/config';
import { DatabaseConfig } from './config/database';
import { TokenConfig } from './config/token';
import { CacheModule } from 'nestjs-cache-redis';
import { CacheConfig } from './config/cache';
import { ThrottlerModule } from '@nestjs/throttler';
import { RateLimitConfig } from './config/rate-limit';
import { BullModule } from '@nestjs/bull';
import { QueueConfig } from './config/queue';
import { TwilioModule } from 'nestjs-twilio';
import { SmsConfig } from './config/sms';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfig } from './config/mail';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventConfig } from './config/event';
import { SocketModule } from './modules/shared/socket/socket.module';
import { S3Module } from 'nestjs-storage-awss3';
import { StorageConfig } from './config/storage';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigurationConfig.getInstance()),
    TypeOrmModule.forRootAsync(DatabaseConfig.getInstance()),
    JwtModule.register(TokenConfig.getInstance()),
    CacheModule.registerAsync(CacheConfig.getInstance()),
    ThrottlerModule.forRootAsync(RateLimitConfig.getInstance()),
    BullModule.forRootAsync(QueueConfig.getInstance()),
    TwilioModule.forRootAsync(SmsConfig.getInstance()),
    MailerModule.forRootAsync(MailConfig.getInstance()),
    EventEmitterModule.forRoot(EventConfig.getInstance()),
    S3Module.registerAsync(StorageConfig.getInstance()),
    CommonModule,
    SocketModule,
    FeatureModule,
  ],
})
export class AppModule {}
