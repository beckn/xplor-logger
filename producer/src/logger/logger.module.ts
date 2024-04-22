// Import necessary decorators and services from NestJS and local files
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { GrafanaLoggerService } from './logger.service';
import { GrafanaLoggerController } from './logger.controller';

// Define a module for handling Grafana log messages
@Module({
 imports: [
    // Register the ClientsModule with configuration for connecting to a RabbitMQ server
    ClientsModule.register([
      {
        // Name of the microservice client
        name: 'LOGGER_SERVICE',
        // Transport protocol used by the microservice
        transport: Transport.RMQ,
        options: {
          // The URL of the RabbitMQ server, retrieved from environment variables
          urls: [process.env.RABBIT_URL],
          // The name of the RabbitMQ queue to listen to, also retrieved from environment variables
          queue: process.env.QUEUE_NAME,
        },
      },
    ]),
 ],
 // Declare the controllers that are part of this module
 controllers: [GrafanaLoggerController],
 // Declare the providers (services) that are part of this module
 providers: [GrafanaLoggerService],
})
export class GrafanaLoggerModule {}