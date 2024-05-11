import { Module } from '@nestjs/common';
import { MailService } from './services/mail.service';
import { BullModule } from '@nestjs/bull';
import { MailProcessor } from './processor/mail.processor';

@Module({
  imports: [BullModule.registerQueue({ name: 'MAIL' })],
  providers: [MailService, MailProcessor],
  exports: [MailService],
})
export class MailModule {}
