// Define the log levels that can be used in the logging system.
// Each level represents a different severity of a log message.

export const LOG_LEVELS = {
  INFO: 'info', // Represents informational messages that highlight the progress of the application at coarse-grained level.
  DEBUG: 'debug', // Represents detailed information on the flow through the system. It is primarily useful for debugging during development.
  WARNING: 'warn', // Represents potentially harmful situations.
  ERROR: 'error', // Represents error events that might still allow the application to continue running.
  VERBOSE: 'verbose', // Represents detailed debug information.
};
/**
 * `LOG_DONE` is a constant object that defines a specific log level for indicating
 * the completion of a task or operation within the application. It is used to
 * categorize log messages that signify the successful conclusion of a process,
 * allowing developers and system administrators to easily filter and identify
 * such messages in the application's log output.
 **/
export const LOG_DONE = {
  INFO: 'DONE',
};
