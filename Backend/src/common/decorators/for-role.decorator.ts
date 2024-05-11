import { SetMetadata } from '@nestjs/common';

export const ForRole = (...args: number[]) => SetMetadata('for-role', args);
