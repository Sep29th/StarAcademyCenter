import { MailerOptions } from '@nestjs-modules/mailer';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigService } from '@nestjs/config';

export class MailConfig implements MailerAsyncOptions {
  inject?: any[] = [ConfigService];

  useFactory?: (...args: any[]) => MailerOptions | Promise<MailerOptions> = (
    configService: ConfigService,
  ): MailerOptions => ({
    transport: {
      host: configService.get('MAIL_HOST'),
      port: configService.get('MAIL_PORT'),
      secure: configService.get('MAIL_ENCRYPTION') === 'true',
      auth: {
        user: configService.get('MAIL_USERNAME'),
        pass: configService.get('MAIL_PASSWORD'),
      },
    },
    defaults: {
      from: `"${configService.get('MAIL_FROM_NAME')}" ${configService.get('MAIL_FROM_ADDRESS')}`,
    },
    template: {
      dir: 'src/modules/shared/mail/templates',
      adapter: new EjsAdapter({ inlineCssEnabled: true }),
      options: {
        strict: true,
      },
    },
  });

  private static instance: MailConfig;

  static getInstance(): MailConfig {
    return this.instance ?? (this.instance = new MailConfig());
  }
}
