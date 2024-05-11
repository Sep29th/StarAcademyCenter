import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class MailService {
  constructor(
    @InjectQueue('MAIL')
    private mailQueue: Queue,
  ) {}
  async sendVerifyMail(to: string): Promise<void> {
    await this.mailQueue.add('verifyMail', { to });
  }
}
