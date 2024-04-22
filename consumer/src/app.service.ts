// Import necessary decorators and services from NestJS and the application.
import { Injectable } from '@nestjs/common';

import { GrafanaLogger } from './utils/grafana-logger';
import { LOG_LEVELS } from './constants/log-level';

// Define the AppService class, which is responsible for handling log messages and forwarding them to Grafana.
@Injectable()
export class AppService {

 // Constructor for the AppService class.
 constructor()
 {}

 // Method to push log messages to Grafana based on the log level.
 // This method creates a new instance of GrafanaLogger and uses it to log messages at the appropriate level.
 pushLogsToGrafana(serviceName:string, message:any,levels:string, job?:string) {
    // Create a new GrafanaLogger instance with the service name and optional job name.
    const logger = new GrafanaLogger(serviceName, job);
    // Switch statement to handle different log levels.
    switch (levels) {
      case LOG_LEVELS.INFO:
        // Log the message at the INFO level.
        logger.log(message);
        break;
      case LOG_LEVELS.DEBUG:
        // Log the message at the DEBUG level.
        logger.debug(message);
        break;
      case LOG_LEVELS.WARNING:
        // Log the message at the WARNING level.
        logger.warn(message);
        break;
      case LOG_LEVELS.ERROR:
        // Log the message at the ERROR level.
        logger.error(message);
        break;
      default:
        // If the log level is not recognized, log the message at the default INFO level.
        logger.log(message);
        break;
    }
 }
}