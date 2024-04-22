import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import configuration from './env/env.config';
import { GrafanaLoggerModule } from './logger/logger.module';
import envValidation from './env/validation/env.validation';



@Module({
  imports: [ConfigModule.forRoot({
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
 }),GrafanaLoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
