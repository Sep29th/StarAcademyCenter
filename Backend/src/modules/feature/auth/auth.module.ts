import { Module } from '@nestjs/common';
import { LocalController } from './controllers/local.controller';
import { OauthController } from './controllers/oauth.controller';
import { SmsModule } from '../../shared/sms/sms.module';
import { MailModule } from 'src/modules/shared/mail/mail.module';

@Module({
  imports: [SmsModule, MailModule],
  controllers: [LocalController, OauthController],
})
export class AuthModule {}
