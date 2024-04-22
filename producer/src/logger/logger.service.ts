// Import necessary decorators and services from NestJS and local files
import {
  BadGatewayException,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { LogMessageDto } from './dto/log-message.dto';
import { LOG_LEVELS, LOG_DONE } from '../constant/log-level';

// Define a service for logging messages to Grafana using RabbitMQ
@Injectable()
export class GrafanaLoggerService implements LoggerService {
  // Inject the RabbitMQ client proxy with the name 'LOGGER_SERVICE'
  constructor(@Inject('LOGGER_SERVICE') private rabbitClient: ClientProxy) {}

  // Method to push logs to Grafana
  pushLogsToGrafana(logs: LogMessageDto) {
    try {
      // Emit the log message to the 'logs' event on the RabbitMQ server

      this.rabbitClient.emit('logs', logs);
      // Return a success message
      return LOG_DONE.INFO;
    } catch (error) {
      // Throw a BadGatewayException if there's an error
      throw new BadGatewayException(error?.message);
    }
  }

  // Method to write a 'log' level log
  log(serviceName: string, message: any, methodName?: string) {
    return this.pushLogsToGrafana({
      serviceName: serviceName,
      message: message,
      level: LOG_LEVELS.INFO,
      methodName: methodName,
    });
  }

  // Method to write an 'error' level log
  error(serviceName: string, message: any, methodName?: string) {
    return this.pushLogsToGrafana({
      serviceName: serviceName,
      message: message,
      level: LOG_LEVELS.ERROR,
      methodName: methodName,
    });
  }

  // Method to write a 'warn' level log
  warn(serviceName: string, message: any, methodName?: string) {
    return this.pushLogsToGrafana({
      serviceName: serviceName,
      message: message,
      level: LOG_LEVELS.WARNING,
      methodName: methodName,
    });
  }

  // Method to write a 'debug' level log
  debug(serviceName: string, message: any, methodName?: string) {
    return this.pushLogsToGrafana({
      serviceName: serviceName,
      message: message,
      level: LOG_LEVELS.DEBUG,
      methodName: methodName,
    });
  }

  // Method to write a 'verbose' level log
  verbose(serviceName: string, message: any, methodName?: string) {
    return this.pushLogsToGrafana({
      serviceName: serviceName,
      message: message,
      level: 'VERBOSE',
      methodName: methodName,
    });
  }
}
