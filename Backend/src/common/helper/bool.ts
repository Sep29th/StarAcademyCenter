import { Injectable } from '@nestjs/common';

@Injectable()
export class Bool extends Boolean {
  parse(input: any): boolean {
    return input === 'true' || input === 1;
  }

  static parse(input: any): boolean {
    return input === 'true' || input === 1;
  }
}
