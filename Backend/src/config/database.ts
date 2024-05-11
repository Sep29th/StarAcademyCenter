import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import {
  DatabaseType,
  DataSource,
  DataSourceOptions,
  Logger,
  QueryRunner,
} from 'typeorm';
import * as dotenv from 'dotenv';
import { Bool } from '../common/helper/bool';
import * as fs from 'fs-extra';
import { env } from '../common/helper/env';
import { Student } from 'src/models/entities/Student.entity';
import { Class } from 'src/models/entities/Class.entity';
import { Discount } from 'src/models/entities/Discount.entity';
import { ClassToStudent } from 'src/models/entities/ClassToStudent.entity';
import { Attendance } from 'src/models/entities/Attendance.entity';
import { ClassNotification } from 'src/models/entities/ClassNotification.entity';
import { Classroom } from 'src/models/entities/Classroom.entity';
import { Course } from 'src/models/entities/Course.entity';
import { Document } from 'src/models/entities/Document.entity';
import { Exercise } from 'src/models/entities/Exercise.entity';
import { History } from 'src/models/entities/History.entity';
import { Lesson } from 'src/models/entities/Lesson.entity';
import { Manager } from 'src/models/entities/Manager.entity';
import { Parent } from 'src/models/entities/Parent.entity';
import { PaymentHistory } from 'src/models/entities/PaymentHistory.entity';
import { StudySession } from 'src/models/entities/StudySession.entity';
import { Subject } from 'src/models/entities/Subject.entity';
import { Teacher } from 'src/models/entities/Teacher.entity';

const moment = require('moment-timezone');

/************************************
 * LOG CONFIG FOR DATASOURCE OPTION *
 ************************************/
class DatabaseLog implements Logger {
  private static configService: ConfigService = new ConfigService();
  private static instance: DatabaseLog;

  private constructor() { }

  static getInstance(): DatabaseLog {
    return this.instance ?? (this.instance = new DatabaseLog());
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    DatabaseLog.configService.get('DB_LOG') == 'true' &&
      fs.appendFile(
        'src/storage/logs/sql/sql.log',
        '[' +
        moment()
          .utcOffset('+07:00')
          .format('HH:mm:ss - DD/MM/YYYY (+07:00)') +
        '] - ' +
        query +
        '\n',
      );
    return;
  }

  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    return;
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    return;
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    return;
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    return;
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    return;
  }
}

/*********************************
 * THIS DATASOURCE IS FOR MODULE *
 *********************************/
export class DatabaseConfig implements TypeOrmModuleAsyncOptions {
  private constructor() { }

  inject: any[] = [ConfigService, Bool];
  useFactory = (configService: ConfigService, bool: Bool): any => ({
    type: configService.get('DB_CONNECTION') as DatabaseType,
    host: configService.get('DB_HOST'),
    port: +configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    logging: true,
    logger: DatabaseLog.getInstance(),
    entities: [Attendance, Class, ClassNotification, Classroom, ClassToStudent, Course, Discount, Document, Exercise, History, Lesson, Manager, Parent, PaymentHistory, Student, StudySession, Subject, Teacher],
    synchronize: false,
  });
  private static instance: DatabaseConfig;

  static getInstance(): DatabaseConfig {
    return this.instance ?? (this.instance = new DatabaseConfig());
  }
}

/************************************
 * THIS DATASOURCE IS FOR DB ACTION *
 ************************************/

const datasource: DataSource = new DataSource({
  type: env.DB_CONNECTION as DatabaseType,
  host: env.DB_HOST,
  port: +env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  logging: true,
  logger: DatabaseLog.getInstance(),
  synchronize: false,
  migrations: ['src/database/migrations/*.ts'],
  seeds: ['src/database/seeds/*.ts'],
  factories: ['src/database/factories/*.ts'],
  cli: {
    seedsDir: 'src/database/seeds',
    factoriesDir: 'src/database/factories',
    migrationsDir: 'src/database/migrations',
  },
  entities: ['src/models/entities/*.ts'],
} as DataSourceOptions);
export default datasource;
