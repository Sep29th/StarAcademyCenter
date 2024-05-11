import { Global, Module, ModuleMetadata } from '@nestjs/common';
import { Bool } from './helper/bool';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { Random } from './helper/random';

@Global()
@Module({
  providers: [Bool, AccessTokenStrategy, Random],
  exports: [Bool, AccessTokenStrategy, Random],
} as ModuleMetadata)
export class CommonModule {}
