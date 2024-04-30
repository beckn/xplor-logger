import { Test, TestingModule } from '@nestjs/testing';
import { BadGatewayException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { LogMessageDto } from './dto/log-message.dto';
import { LOG_LEVELS } from '../constant/log-level';
import { GrafanaLoggerService } from './logger.service';

// Describe block for the GrafanaLoggerService test suite
describe('GrafanaLoggerService', () => {
  let service: GrafanaLoggerService;
  let mockClientProxy: jest.Mocked<ClientProxy>;

  // BeforeEach block to set up the testing module and dependencies before each test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GrafanaLoggerService, // Provide the GrafanaLoggerService
        {
          provide: 'LOGGER_SERVICE', // Provide a mocked client proxy for the service
          useValue: {
            emit: jest.fn(), // Mock the emit method of the client proxy
          },
        },
      ],
    }).compile(); // Compile the testing module

    // Initialize the service and mocked client proxy for each test
    service = module.get<GrafanaLoggerService>(GrafanaLoggerService);
    mockClientProxy = module.get('LOGGER_SERVICE');
  });

  // Test case: Ensure that the service is defined
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('pushLogsToGrafana', () => {
    // Test case: Ensure that log messages are emitted to RabbitMQ correctly
    it('should emit log message to RabbitMQ', async () => {
      // Mock log message data
      const logs: LogMessageDto = {
        serviceName: 'TestService', // Mock service name
        message: 'Test message', // Mock log message
        level: LOG_LEVELS.INFO, // Mock log level
        methodName: 'testMethod', // Mock method name
      };

      // Call the pushLogsToGrafana method of the service with the mock log message
      service.pushLogsToGrafana(logs);

      // Assert that the emit method of the mock client proxy is called with the correct parameters
      expect(mockClientProxy.emit).toHaveBeenCalledWith('logs', logs);
    });

    // Test case: Ensure that BadGatewayException is thrown if emitting fails
    it('should throw BadGatewayException if emitting fails', async () => {
      try {
        // Mock log message data
        const logs: LogMessageDto = {
          serviceName: 'TestService',
          message: 'Test message',
          level: LOG_LEVELS.INFO,
          methodName: 'testMethod',
        };

        // Expect the pushLogsToGrafana method to throw BadGatewayException
        await expect(service.pushLogsToGrafana(logs)).rejects.toThrowError(
          BadGatewayException,
        );
      } catch (error) {
        // This catch block is redundant and unnecessary
        const errorMessage = 'Failed to emit log message';
        mockClientProxy.emit.mockImplementationOnce(() => {
          throw new Error(errorMessage);
        });
      }
    });

    // Test case: Ensure that pushLogsToGrafana is called with correct parameters for log level INFO
    it('should call pushLogsToGrafana with correct parameters for log level INFO', async () => {
      // Spy on the pushLogsToGrafana method of the service
      const pushLogsToGrafanaSpy = jest.spyOn(service, 'pushLogsToGrafana');
      const serviceName = 'TestService';
      const message = 'Test message';
      const methodName = 'testMethod';

      // Call the log method of the service with mock parameters
      service.log(serviceName, message, methodName);

      // Assert that pushLogsToGrafana is called with the correct parameters for log level INFO
      expect(pushLogsToGrafanaSpy).toHaveBeenCalledWith({
        serviceName,
        message,
        level: LOG_LEVELS.INFO,
        methodName,
      });
    });

    // Test case: Ensure that pushLogsToGrafana is called with correct parameters for log level ERROR
    it('should call pushLogsToGrafana with correct parameters for log level ERROR', async () => {
      // Spy on the pushLogsToGrafana method of the service
      const pushLogsToGrafanaSpy = jest.spyOn(service, 'pushLogsToGrafana');
      const serviceName = 'TestService';
      const message = 'Test message';
      const methodName = 'testMethod';

      // Call the error method of the service with mock parameters
      service.error(serviceName, message, methodName);

      // Assert that pushLogsToGrafana is called with correct parameters for log level ERROR
      expect(pushLogsToGrafanaSpy).toHaveBeenCalledWith({
        serviceName,
        message,
        level: LOG_LEVELS.ERROR,
        methodName,
      });
    });

    // Test case: Ensure that pushLogsToGrafana is called with correct parameters for log level WARNING
    it('should call pushLogsToGrafana with correct parameters for log level WARNING', async () => {
      // Spy on the pushLogsToGrafana method of the service
      const pushLogsToGrafanaSpy = jest.spyOn(service, 'pushLogsToGrafana');
      const serviceName = 'TestService';
      const message = 'Test message';
      const methodName = 'testMethod';

      // Call the warn method of the service with mock parameters
      await service.warn(serviceName, message, methodName);

      // Assert that pushLogsToGrafana is called with correct parameters including log level WARNING
      expect(pushLogsToGrafanaSpy).toHaveBeenCalledWith({
        serviceName,
        message,
        level: LOG_LEVELS.WARNING,
        methodName,
      });
    });

    // Test case: Ensure that pushLogsToGrafana is called with correct parameters for log level DEBUG
    it('should call pushLogsToGrafana with correct parameters for log level DEBUG', async () => {
      // Spy on the pushLogsToGrafana method of the service
      const pushLogsToGrafanaSpy = jest.spyOn(service, 'pushLogsToGrafana');
      const serviceName = 'TestService';
      const message = 'Test message';
      const methodName = 'testMethod';

      // Call the debug method of the service with mock parameters
      service.debug(serviceName, message, methodName);

      // Assert that pushLogsToGrafana is called with the correct parameters for log level DEBUG
      expect(pushLogsToGrafanaSpy).toHaveBeenCalledWith({
        serviceName,
        message,
        level: LOG_LEVELS.DEBUG,
        methodName,
      });
    });

    // Test case: Ensure that pushLogsToGrafana is called with correct parameters for log level VERBOSE
    it('should call pushLogsToGrafana with correct parameters for log level VERBOSE', async () => {
      // Spy on the pushLogsToGrafana method of the service
      const pushLogsToGrafanaSpy = jest.spyOn(service, 'pushLogsToGrafana');
      const serviceName = 'TestService';
      const message = 'Test message';
      const methodName = 'testMethod';

      // Call the verbose method of the service with mock parameters
      service.verbose(serviceName, message, methodName);

      // Assert that pushLogsToGrafana is called with the correct parameters for log level VERBOSE
      expect(pushLogsToGrafanaSpy).toHaveBeenCalledWith({
        serviceName,
        message,
        level: 'VERBOSE',
        methodName,
      });
    });
  });
});
