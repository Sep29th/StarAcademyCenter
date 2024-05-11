import {
  CorsOptions,
  CustomOrigin,
} from '@nestjs/common/interfaces/external/cors-options.interface';

export class CorsConfig implements CorsOptions {
  origin?: (string | boolean | RegExp | (string | RegExp)[]) | CustomOrigin = [
    'http://localhost:*',
    'http://127.0.0.1:*',
  ];
  methods?: string | string[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
  allowedHeaders?: string | string[] = ['Content-Type', 'Authorization'];
  credentials?: boolean = true;

  private static instance: CorsConfig;
  static getInstance(): CorsConfig {
    return this.instance ?? (this.instance = new CorsConfig());
  }
}
