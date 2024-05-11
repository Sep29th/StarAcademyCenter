/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-default-export */
import type { Factory, Seeder } from 'nestjs-typeorm-seeding';
import type { DataSource } from 'typeorm';

export default class WeekdayType1715073501905 implements Seeder {
  public async run(_factory: Factory, _connection: DataSource): Promise<any> {
    _connection.query("INSERT INTO `weekdayType` (`values`) VALUES (?), (?), (?), (?), (?), (?), (?)", ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"])
  }
}