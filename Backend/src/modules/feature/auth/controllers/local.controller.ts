import { Body, Controller, Post } from '@nestjs/common';
import { SignUpLocalDto } from '../dto/sign-up-local.dto';

@Controller('auth/local')
export class LocalController {
  constructor() {}

  @Post('sign-up')
  async signUp(@Body() signUpLocalDto: SignUpLocalDto): Promise<void> {}

  @Post('verify')
  async verify(@Body() info: any) {}

  @Post('sign-in')
  signIn() {}

  @Post('log-out')
  logOut() {}

  @Post('refresh')
  refreshToken() {}
}
