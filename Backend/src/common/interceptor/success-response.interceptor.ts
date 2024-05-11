import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { getReasonPhrase } from 'http-status-codes';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { SuccessResponse } from '../class/success-response';
import { ApiLoggerConfig } from '../../config/logger';
import { Logger } from 'winston';

@Injectable()
export class SuccessResponseInterceptor implements NestInterceptor {
  private apiLoggerConfig: Logger = ApiLoggerConfig.getInstance();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext: HttpArgumentsHost = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();
    return next.handle().pipe(
      map(
        (data): any =>
          new SuccessResponse(
            request.url,
            new Date().toISOString(),
            response.statusCode,
            getReasonPhrase(response.statusCode),
            data,
          ),
      ),
      tap((): void => {
        this.apiLoggerConfig.log('info', {
          ip: request.ip,
          date: new Date().toISOString(),
          method: request.method,
          url: request.url,
          status: response.statusCode,
          userID: request.user?.id,
        });
      }),
    );
  }
}
