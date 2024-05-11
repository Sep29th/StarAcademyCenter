import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { InternalServerErrorException } from '@nestjs/common';
import { Job } from 'bull';
import { CacheService, InjectCache } from 'nestjs-cache-redis';
import { Random } from 'src/common/helper/random';

@Processor('MAIL')
export class MailProcessor {
  constructor(
    @InjectCache()
    private cacheService: CacheService,
    private mailService: MailerService,
    private random: Random,
  ) {}

  @Process('verifyMail')
  async verifyEmail(job: Job<{ to: string }>): Promise<void> {
    try {
      const otp: string = this.random.randomNumberString(6);
      await this.cacheService.hSet('OTP-MAIL', job.data.to, otp);
      await this.mailService.sendMail({
        to: job.data.to,
        subject: 'Verify email from Awesome Nestjs',
        template: 'verify-email',
        context: {
          id: 1,
          password: 'ashdjashj',
          email: job.data.to,
          code: otp,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
