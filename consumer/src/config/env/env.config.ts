// This file is responsible for parsing and providing access to environment variables.
// It reads the values from the process environment and provides them in a structured format.
// This abstraction simplifies the access to configuration values throughout the application.
export default () => ({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  rabbitUrl: process.env.RABBIT_URL,
  lokiUrl: process.env.LOKI_URL,
  localRabbitUrl: process.env.LOCAL_RABBIT_URL,
  queueName: process.env.QUEUE_NAME

});
