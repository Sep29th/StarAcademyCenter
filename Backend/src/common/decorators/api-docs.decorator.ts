import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger';
import { ErrorResponse } from '../class/error-response';
import { SuccessResponse } from '../class/success-response';

export const ApiDocs = (): MethodDecorator => {
  return applyDecorators(
    ApiResponse({
      type: ErrorResponse,
      status: '4XX',
      description: 'Error',
    } as ApiResponseOptions),
    ApiResponse({
      type: SuccessResponse,
      status: '2XX',
      description: 'Success',
    } as ApiResponseOptions),
  );
};
