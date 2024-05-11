/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-default-export */
import type { Factory, Seeder } from 'nestjs-typeorm-seeding';
import type { DataSource } from 'typeorm';

export default class TuitionPaymentMethodType1715091742381 implements Seeder {
  public async run(_factory: Factory, _connection: DataSource): Promise<any> {
    _connection.query("INSERT INTO `tuitionPaymentMethodType` (`values`) VALUES (?), (?)", ["batched", "payoff"])
  }
}