/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-default-export */
import type { Factory, Seeder } from 'nestjs-typeorm-seeding';
import type { DataSource } from 'typeorm';

export default class DiscountType1715091814318 implements Seeder {
  public async run(_factory: Factory, _connection: DataSource): Promise<any> {
    _connection.query("INSERT INTO `discountType` (`values`) VALUES (?), (?)", ["percent", "fixed"])
  }
}