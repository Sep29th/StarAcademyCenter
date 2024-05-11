import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse {
  @ApiProperty()
  private path?: string;
  @ApiProperty()
  private timestamp?: string;
  @ApiProperty()
  private message?: string;
  @ApiProperty()
  private success?: any;
  @ApiProperty()
  private statusCode?: number;

  constructor(
    path: string,
    timestamp: string,
    statusCode: number,
    message?: string,
    success?: any,
  ) {
    this.path = path;
    this.timestamp = timestamp;
    this.statusCode = statusCode;
    this.message = message;
    this.success = success;
  }
}
