import { Injectable } from '@nestjs/common';

@Injectable()
export class Random {
  static characters: string =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  static numbers: string = '0123456789';

  static randomString(length: number): string {
    let result: string = '';
    const charactersLength: number = this.characters.length;
    for (let i: number = 0; i < length; i++) {
      result += this.characters.charAt(
        Math.floor(Math.random() * charactersLength),
      );
    }
    return result;
  }

  randomString(length: number): string {
    let result: string = '';
    const charactersLength: number = Random.characters.length;
    for (let i: number = 0; i < length; i++) {
      result += Random.characters.charAt(
        Math.floor(Math.random() * charactersLength),
      );
    }
    return result;
  }

  static randomNumberString(length: number): string {
    let result: string = '';
    const numbersLength: number = this.numbers.length;
    for (let i: number = 0; i < length; i++) {
      result += this.numbers.charAt(Math.floor(Math.random() * numbersLength));
    }
    return result;
  }

  randomNumberString(length: number): string {
    let result: string = '';
    const numbersLength: number = Random.numbers.length;
    for (let i: number = 0; i < length; i++) {
      result += Random.numbers.charAt(
        Math.floor(Math.random() * numbersLength),
      );
    }
    return result;
  }
}
