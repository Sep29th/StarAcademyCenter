import { JwtModuleOptions } from '@nestjs/jwt';

export class TokenConfig implements JwtModuleOptions {
  private constructor() {}

  global?: boolean = true;
  private static instance: TokenConfig;

  static getInstance(): TokenConfig {
    return this.instance ?? (this.instance = new TokenConfig());
  }
}
