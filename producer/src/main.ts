// Import necessary modules and services from NestJS and local files
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as cors from 'cors';

import { AppModule } from './app.module';

// Define an asynchronous function to bootstrap the application
async function bootstrap() {
  // Create a Nest application instance by calling NestFactory.create with the AppModule
  const app = await NestFactory.create(AppModule);

  // Retrieve the ConfigService instance from the application context
  // This service is used to access configuration values, such as environment variables
  const configService = app.get(ConfigService);

  // Enable CORS
  app.use(cors());

  // Enable Helmet
  app.use(helmet());

  // Start the application to listen on a port specified by the 'PORT' environment variable
  // The ConfigService.get method is used to retrieve the value of 'PORT'
  // If the 'PORT' environment variable is not set, this will throw an error
  await app.listen(configService.get<string>('PORT'));
}

// Call the bootstrap function to start the application
bootstrap();
