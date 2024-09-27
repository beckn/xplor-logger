// Define the log levels that can be used in the logging system.
// Each level represents a different severity of a log message.
export const LOG_LEVELS = {
  INFO: 'info', // Represents informational messages that highlight the progress of the application at coarse-grained level.
  DEBUG: 'debug', // Represents detailed information on the flow through the system. It is primarily useful for debugging during development.
  WARNING: 'warn', // Represents potentially harmful situations.
  ERROR: 'error', // Represents error events that might still allow the application to continue running.
  VERBOSE: 'verbose', // Represents detailed debug information.
};

// Define a default method name that can be used when no specific method name is provided.
// This is useful for logging messages that are not directly associated with a specific method.
export const METHOD = {
  default: 'default-method', // The default method name used in logging when no specific method is identified.
};

// Define the format for displaying time in log messages.
// This format is used to ensure consistency in how time is displayed across all log messages.
export const TIME = {
  format: 'MM/DD/YYYY, h:mm:ss A', // The format for displaying time in log messages.
};
