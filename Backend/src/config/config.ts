import { ConfigModuleOptions } from '@nestjs/config';

export class ConfigurationConfig implements ConfigModuleOptions {
  private constructor() {}
  isGlobal?: boolean = true;
  private static instance: ConfigurationConfig;
  static getInstance(): ConfigurationConfig {
    return this.instance ?? (this.instance = new ConfigurationConfig());
  }
}
