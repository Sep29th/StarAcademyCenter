import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ErrorResponse } from '../class/error-response';
import { Logger } from 'winston';
import { ApiLoggerConfig } from '../../config/logger';
import { ThrottlerException } from '@nestjs/throttler';

@Catch(HttpException, ThrottlerException)
export class ErrorResponseFilter implements ExceptionFilter {
  private apiLoggerConfig: Logger = ApiLoggerConfig.getInstance();
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const httpStatus = exception.getStatus();
    const request = ctx.getRequest();
    this.apiLoggerConfig.log('info', {
      ip: request.ip,
      date: new Date().toISOString(),
      method: request.method,
      url: request.url,
      status: httpStatus,
      userID: request.user?.id,
    });
    httpAdapter.reply(
      ctx.getResponse(),
      new ErrorResponse(
        request.url,
        new Date().toISOString(),
        exception.status || exception.response.statusCode,
        typeof exception.response == 'string'
          ? exception.response
          : exception.response.message,
        exception.response.error,
      ),
      httpStatus,
    );
  }
}
