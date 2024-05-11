import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty()
  private path?: string;
  @ApiProperty()
  private timestamp?: string;
  @ApiProperty()
  private message?: any;
  @ApiProperty()
  private error?: string;
  @ApiProperty()
  private statusCode?: number;

  constructor(
    path: string,
    timestamp: string,
    statusCode: number,
    message?: any,
    error?: string,
  ) {
    this.path = path;
    this.timestamp = timestamp;
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}
