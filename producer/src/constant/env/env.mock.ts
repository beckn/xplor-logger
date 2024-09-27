// Constant representing invalid environment variables for testing
export const invalidEnvironmentVariables = {
  NODE_ENV: 'invalid', // Invalid value
  PRODUCER_PORT: '8080', // Invalid value (not a number)
  RABBIT_MQ_URL: 'amqp://localhost',
  LOCAL_RABBIT_MQ_URL: 'amqp://localhost',
};

// Constant representing valid environment variables for testing
export const environmentVariables = {
  NODE_ENV: 'development',
  PRODUCER_PORT: 8080,
  RABBIT_MQ_URL: 'amqp://localhost',
  LOCAL_RABBIT_MQ_URL: 'amqp://localhost',
};

// Constant representing missing environment variables for testing
export const missingEnvironmentVariables = {
  PRODUCER_PORT: 8080,
  RABBIT_MQ_URL: 'amqp://localhost',
  LOCAL_RABBIT_MQ_URL: 'amqp://localhost',
};
