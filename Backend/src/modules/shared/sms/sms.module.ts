import { Module } from '@nestjs/common';
import { SmsService } from './services/sms.service';
import { BullModule } from '@nestjs/bull';
import { SmsProcessor } from './processor/sms.processor';

@Module({
  imports: [BullModule.registerQueue({ name: 'SMS' })],
  providers: [SmsService, SmsProcessor],
  exports: [SmsService],
})
export class SmsModule {}
