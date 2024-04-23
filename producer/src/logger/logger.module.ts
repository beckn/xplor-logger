// Import necessary decorators and services from NestJS and local files
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { GrafanaLoggerService } from './logger.service';
import { GrafanaLoggerController } from './logger.controller';


// Define a module for handling Grafana log messages

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'LOGGER_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBIT_MQ_URL')],
            queue: configService.get<string>('QUEUE_NAME'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  // Declare the controllers that are part of this module
  controllers: [GrafanaLoggerController],
  // Declare the providers (services) that are part of this module
  providers: [GrafanaLoggerService],
})
export class GrafanaLoggerModule {}
