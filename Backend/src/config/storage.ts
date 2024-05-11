import { ConfigService } from '@nestjs/config';
import { S3ModuleAsyncOptions, S3ModuleOptions } from 'nestjs-storage-awss3';
import { Bool } from 'src/common/helper/bool';

export class StorageConfig implements S3ModuleAsyncOptions {
  isGlobal?: boolean = true;
  injects?: any[] = [ConfigService, Bool];
  useFactory?: (...args: any[]) => S3ModuleOptions | Promise<S3ModuleOptions> =
    (configService: ConfigService, bool: Bool) => ({
      region: configService.get('AWS_DEFAULT_REGION'),
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      },
      forcePathStyle: bool.parse(
        configService.get('AWS_USE_PATH_STYLE_ENDPOINT'),
      ),
    });

  private static instance: StorageConfig;
  static getInstance(): StorageConfig {
    return this.instance ?? (this.instance = new StorageConfig());
  }
}
