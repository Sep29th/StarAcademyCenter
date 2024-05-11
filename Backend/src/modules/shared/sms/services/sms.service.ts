import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class SmsService {
  constructor(
    @InjectQueue('SMS')
    private queueService: Queue,
  ) {}

  async sendVerifySms(to: string): Promise<void> {
    await this.queueService.add('verifySms', { to });
  }
}
