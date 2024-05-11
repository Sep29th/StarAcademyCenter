import { StorageService } from '../interfaces/storage.interface';
import { join } from 'path';
import { createReadStream, ReadStream } from 'fs-extra';
import { StreamableFile } from '@nestjs/common';
import * as process from 'process';

export class StorageLocalService implements StorageService {
  getFile(path: string): StreamableFile {
    const file: ReadStream = createReadStream(
      join(process.cwd(), `src/storage/app/${path}`),
    );
    return new StreamableFile(file);
  }

  saveFile(path: string): boolean {
    throw new Error('Method not implemented.');
  }
}
