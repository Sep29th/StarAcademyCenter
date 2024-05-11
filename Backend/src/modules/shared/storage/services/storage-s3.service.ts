import { Injectable } from '@nestjs/common';
import { StorageService } from '../interfaces/storage.interface';
import { InjectS3, S3Service } from 'nestjs-storage-awss3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageS3Service implements StorageService {
  constructor(
    @InjectS3()
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  async getFile(path: string) {
    return (
      await this.s3Service.getObject({
        Bucket: this.configService.get('AWS_BUCKET'),
        Key: path,
      })
    ).Body;
  }

  saveFile(path: string): boolean {
    throw new Error('Method not implemented.');
  }
}
