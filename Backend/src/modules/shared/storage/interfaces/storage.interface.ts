import { StreamableFile } from '@nestjs/common';

export interface StorageService {
  getFile(path: string): any;
  saveFile(path: string): any;
}
