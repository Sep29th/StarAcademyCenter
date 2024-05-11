export class WEEKDAYTYPE {
  static MONDAY = 1;
  static TUESDAY = 2;
  static WEDNESDAY = 3;
  static THURSDAY = 4;
  static FRIDAY = 5;
  static SATURDAY = 6;
  static SUNDAY = 7

  private static values = new Map([
    [1, 'moday'],
    [2, 'tuesday'],
    [3, 'wednesday'],
    [4, 'thursday'],
    [5, 'friday'],
    [6, 'saturday'],
    [7, 'sunday'],
  ]);

  static get(key: any) {
    return this.values.get(key);
  }
}    
