// Import necessary decorators and services from NestJS and the application.
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

// Define an asynchronous function to bootstrap the application.
// This function is responsible for setting up the microservice and starting it.
async function bootstrap() {
  // Create a microservice instance using the AppModule and the specified microservice options.
  // The microservice is configured to use RabbitMQ as the transport layer.
  console.log('localhost1234567890', process.env.RABBIT_MQ_URL);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      // Specify the transport layer to use. In this case, RabbitMQ is used.
      transport: Transport.RMQ,
      // Configure the microservice options, including the RabbitMQ URL and queue name.
      options: {
        // The URL of the RabbitMQ server. This is retrieved from the environment variables.
        urls: [process.env.RABBIT_MQ_URL],
        // The name of the RabbitMQ queue to listen to. This is also retrieved from the environment variables.
        queue: process.env.QUEUE_NAME,
      },
    },
  );

  // Start the microservice. This will begin listening for messages on the specified RabbitMQ queue.
  app.listen();
}

// Call the bootstrap function to start the application.
bootstrap();
