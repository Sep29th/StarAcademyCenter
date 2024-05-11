import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { CacheService, InjectCache } from 'nestjs-cache-redis';
import { Random } from '../../../../common/helper/random';
import { TwilioService } from 'nestjs-twilio';
import { ConfigService } from '@nestjs/config';
import { InternalServerErrorException } from '@nestjs/common';

@Processor('SMS')
export class SmsProcessor {
  constructor(
    @InjectCache()
    private cacheService: CacheService,
    private random: Random,
    private twilioService: TwilioService,
    private configService: ConfigService,
  ) {}

  @Process('verifySms')
  async verifyPhoneNumber(job: Job<{ to: string }>): Promise<void> {
    try {
      const otp: string = this.random.randomNumberString(6);
      await this.cacheService.hSet('OTP', job.data.to, otp);
      await this.twilioService.client.messages.create({
        from: this.configService.get('TWILIO_NUMBER'),
        to: job.data.to,
        body: `Your OTP code is: ${otp}`,
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
