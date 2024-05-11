export class TUITIONPAYMENTMETHODTYPE {
  static BATCHED = 1;
  static PAYOFF = 2;

  private static values = new Map([
    [1, 'batched'],
    [2, 'payoff']
  ]);

  static get(key: any) {
    return this.values.get(key);
  }
}    
