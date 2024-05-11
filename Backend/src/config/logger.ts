import { ConfigService } from '@nestjs/config';
import { WinstonModuleOptions } from 'nest-winston';
import { format, Logger, LoggerOptions, transports } from 'winston';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';
import 'winston-daily-rotate-file';
import { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';
import { Injectable } from '@nestjs/common';

export class LoggerConfig implements WinstonModuleOptions {
  private static configService: ConfigService = new ConfigService();

  private constructor() {}

  private static instance: Logger;

  static getInstance(): Logger {
    return (
      this.instance ??
      (this.instance = new Logger({
        format: format.combine(
          format.timestamp({
            format: `HH:mm:ss - DD/MM/YYYY `,
          }),
          format.printf(({ timestamp, level, stack, message }) => {
            level = level.toUpperCase().padEnd(7);
            switch (level) {
              case 'ERROR  ':
                level = `\x1b[31m${level}\x1b[0m`;
                break;
              case 'WARN   ':
                level = `\x1b[33m${level}\x1b[0m`;
                break;
              case 'INFO   ':
                level = `\x1b[36m${level}\x1b[0m`;
                break;
              case 'HTTP   ':
                level = `\x1b[35m${level}\x1b[0m`;
                break;
              case 'VERBOSE':
                level = `\x1b[32m${level}\x1b[0m`;
                break;
              case 'DEBUG  ':
                level = `\x1b[34m${level}\x1b[0m`;
                break;
              case 'SILLY  ':
                level = `\x1b[37m${level}\x1b[0m`;
                break;
            }
            return `[${timestamp} \x1b[33m(+07:00)\x1b[0m] - [${level}] - [\x1b[32m${((stack || message) + '').replace(/\n/g, '')}\x1b[0m]`;
          }),
        ),
        transports: [
          new transports.Console({
            level: this.configService.get('LOG_CONSOLE_LEVEL'),
          } as ConsoleTransportOptions),
          new transports.DailyRotateFile({
            filename: this.configService.get('LOG_FILE_LEVEL') + '-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            dirname: 'src/storage/logs/app',
            level: this.configService.get('LOG_FILE_LEVEL'),
            format: format.combine(
              format.timestamp({
                format: 'HH:mm:ss - DD/MM/YYYY (+07:00)',
              }),
              format.printf(
                ({ timestamp, level, stack, message }) =>
                  `[${timestamp}] - [${level.toUpperCase().padEnd(7)}] - [${((stack || message) + '').replace(/\n/g, '')}]`,
              ),
            ),
          } as DailyRotateFileTransportOptions),
        ],
      } as LoggerOptions))
    );
  }
}

@Injectable()
export class ApiLoggerConfig implements WinstonModuleOptions {
  private constructor() {}

  private static instance: Logger;

  static getInstance(): Logger {
    return (
      this.instance ??
      (this.instance = new Logger({
        transports: [
          new transports.DailyRotateFile({
            filename: 'api-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            dirname: 'src/storage/logs/api',
            level: 'silly',
            format: format.combine(
              format.printf((data) => JSON.stringify(data) + ','),
            ),
          } as DailyRotateFileTransportOptions),
        ],
      } as LoggerOptions))
    );
  }
}
