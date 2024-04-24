// Import necessary decorators and services from NestJS and local files
import { Body, Controller, Post } from '@nestjs/common';

import { GrafanaLoggerService } from './logger.service';
import { LogMessageDto } from './dto/log-message.dto';

// Define a controller for handling log messages related to Grafana
@Controller('grafana-logger')
export class GrafanaLoggerController {
  // Inject the GrafanaLoggerService into the controller
  constructor(private readonly loggerService: GrafanaLoggerService) {}

  // Endpoint for sending log messages with the 'info' level
  @Post('info')
  sendLog(@Body() logger: LogMessageDto) {
    // Call the log method of the loggerService with the serviceName, message, and methodName from the request body
    return this.loggerService.log(
      logger.serviceName,
      logger.message,
      logger.methodName,
    );
  }

  // Endpoint for sending log messages with the 'error' level
  @Post('error')
  sendError(@Body() logger: LogMessageDto) {
    // Call the error method of the loggerService with the serviceName, message, and methodName from the request body
    return this.loggerService.error(
      logger.serviceName,
      logger.message,
      logger.methodName,
    );
  }

  // Endpoint for sending log messages with the 'debug' level
  @Post('debug')
  sendDebug(@Body() logger: LogMessageDto) {
    // Call the debug method of the loggerService with the serviceName, message, and methodName from the request body
    return this.loggerService.debug(
      logger.serviceName,
      logger.message,
      logger.methodName,
    );
  }

  // Endpoint for sending log messages with the 'warn' level
  @Post('warn')
  sendWarn(@Body() logger: LogMessageDto) {
    // Call the warn method of the loggerService with the serviceName, message, and methodName from the request body
    return this.loggerService.warn(
      logger.serviceName,
      logger.message,
      logger.methodName,
    );
  }

  // Endpoint for sending log messages with the 'verbose' level
  @Post('verbose')
  sendVerbose(@Body() logger: LogMessageDto) {
    // Call the verbose method of the loggerService with the serviceName, message, and methodName from the request body
    return this.loggerService.verbose(
      logger.serviceName,
      logger.message,
      logger.methodName,
    );
  }
}
