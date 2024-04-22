// Import necessary decorators and modules from NestJS and the application.
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

// Import environment validation and configuration from the application's config directory.
import envValidation from './config/env/validation/env.validation';
import configuration from './config/env/env.config';

// Import the AppController and AppService from the application.
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Define the AppModule class, which is the root module of the application.
// This module is responsible for setting up the application's configuration, controllers, and providers.
@Module({
 imports: [ ConfigModule.forRoot({
    // Make the ConfigModule global so that it can be injected anywhere in the application without needing to import it again.
    isGlobal: true,
    // Load the application's configuration from the specified configuration file.
    load: [configuration],
    // Validate the application's environment variables against the specified schema using Joi.
    validationSchema: Joi.object(envValidation()),
    // Specify options for the validation process.
    validationOptions: {
      // Do not abort the validation process on the first error encountered.
      abortEarly: false,
    },
 }),],
 // Register the AppController with the module so that it can handle incoming requests.
 controllers: [AppController],
 // Register the AppService with the module so that it can be injected into controllers and other services.
 providers: [AppService,],
})
export class AppModule {}