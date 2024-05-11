import { IsEmail, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TestDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}
