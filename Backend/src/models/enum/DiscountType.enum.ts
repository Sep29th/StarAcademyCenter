export class DISCOUNTTYPE {
  static PERCENT = 1;
  static FIXED = 2;

  private static values = new Map([
    [1, 'percent'],
    [2, 'fixed']
  ]);

  static get(key: any) {
    return this.values.get(key);
  }
}    
