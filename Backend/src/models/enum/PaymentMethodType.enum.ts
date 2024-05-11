export class PAYMENTMETHODTYPE {
  static CASH = 1;
  static TRANSFER = 2

  private static values = new Map([
    [1, 'cash'],
    [2, 'transfer']
  ]);

  static get(key: any) {
    return this.values.get(key);
  }
}    
