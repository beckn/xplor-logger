// Import necessary decorators and services from NestJS and the application.
import { Controller } from '@nestjs/common';
import {
  EventPattern,
  Payload,
} from '@nestjs/microservices';
 
import { AppService } from './app.service';
import { LogMessageDto } from './dto/log-message.dto';

// Define the AppController class, which is responsible for handling incoming log messages.
@Controller()
export class AppController {
 // Inject the AppService into the controller to use its methods.
 constructor(private readonly appService: AppService) {}

 // Define a method to handle incoming log messages.
 // This method listens for messages on the 'logs' event pattern.
 @EventPattern('logs')
 pushLogsToGrafana(@Payload() logs: LogMessageDto) {
    // Call the pushLogsToGrafana method of the AppService with the log message details.
    // This method is responsible for processing and forwarding the log messages to Grafana.
    return this.appService.pushLogsToGrafana(logs.serviceName, logs.message, logs.level, logs.methodName);
 }
}