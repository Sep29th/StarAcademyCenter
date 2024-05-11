import { Module } from '@nestjs/common';
import { StorageS3Service } from './services/storage-s3.service';
import { StorageLocalService } from './services/storage-local.service';
import { env } from '../../../common/helper/env';
@Module({
  providers: [
    {
      provide: 'STORAGE_SERVICE',
      useClass:
        env.FILESYSTEM_DISK == 's3' ? StorageS3Service : StorageLocalService,
    },
  ],
  exports: ['STORAGE_SERVICE'],
})
export class StorageModule {}
