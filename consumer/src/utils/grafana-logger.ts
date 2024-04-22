import { Injectable, Logger } from '@nestjs/common';
import * as winston from 'winston';
import LokiTransport from 'winston-loki';
import { ConfigService } from '@nestjs/config';

import { LOG_LEVELS, METHOD, TIME } from '../constants/log-level';

@Injectable()
export class GrafanaLogger extends Logger {
  // Winston logger instance used for logging messages.
  private readonly logger: winston.Logger;
  // The name of the application or service using this logger.
  private readonly appName: string;
  // Instance of ConfigService for accessing configuration values.
  private readonly configService: ConfigService;

  constructor(private readonly serviceName: string, readonly job?: string) {
    super();
    this.appName = serviceName;
    this.configService = new ConfigService();
    // Initialize the Winston logger with specific configurations.

    this.logger = winston.createLogger({
      // Set the minimum log level to DEBUG.
      level: LOG_LEVELS.DEBUG,
      // Define the format of the log messages.
      format: winston.format.combine(
        winston.format.timestamp({
          format: TIME.format, // Use a predefined time format.
        }),
        winston.format.printf(({ level, message, timestamp }) => {
          // Custom format for log messages.
          return `[Nest] ${
            process.pid
          } - ${timestamp} ${level.toUpperCase()} [${
            this.serviceName
          }] ${message}`;
        }),
      ),
      // Define the transports (destinations) for the log messages.
      transports: [
        new winston.transports.Console(), // Log to the console.
        new LokiTransport({
          // Loki transport configuration.
          host: `${this.configService.get<string>('LOKI_URL').trim()}`, // Use the Loki URL from the configuration.
          labels: {
            app: this.serviceName,
            method: this.job ? this.job : METHOD.default,
          }, // Set labels for Loki.
          json: true, // Log messages in JSON format.
          replaceTimestamp: true, // Replace the timestamp with the one from the log message.
          onConnectionError: (err) => console.error(err), // Log connection errors to the console.
        }),
      ],
    });
  }

  // Log an informational message.
  log(message: any): void {
    this.logger.info(message);
  }

  // Log an error message, optionally with a trace.
  error(message: string | object, trace?: string): void {
    if (trace) {
      this.logger.error(`${message} - Trace: ${trace}`);
    } else {
      this.logger.error(message);
    }
  }

  // Log a warning message.
  warn(message: string | object): void {
    this.logger.warn(message);
  }

  // Log a debug message.
  debug(message: string | object): void {
    console.log(this.configService.get<string>('LOKI_URL').trim());

    this.logger.debug(message);
  }

  // Log a verbose message.
  verbose(message: string | object): void {
    this.logger.verbose(message);
  }
}
