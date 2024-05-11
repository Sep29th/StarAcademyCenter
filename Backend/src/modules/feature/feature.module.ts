import { Module } from '@nestjs/common';
import { TestModule } from './test/test.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TestModule, AuthModule],
})
export class FeatureModule {}
