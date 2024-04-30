import { Test, TestingModule } from '@nestjs/testing';

import { LogMessageDto } from './dto/log-message.dto';
import { GrafanaLoggerController } from './logger.controller';
import { GrafanaLoggerService } from './logger.service';

describe('GrafanaLoggerController', () => {
  let controller: GrafanaLoggerController;
  let service: GrafanaLoggerService;

  // Set up testing module and dependencies before each test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrafanaLoggerController], // Provide the controller under test
      providers: [
        GrafanaLoggerService, // Provide the Logger service
        {
          provide: 'LOGGER_SERVICE', // Provide a mocked Logger service
          useValue: {
            emit: jest.fn(), // Mock the emit method of the service
          },
        },
      ],
    }).compile(); // Compile the testing module

    // Initialize the controller and service instances for each test
    controller = module.get<GrafanaLoggerController>(GrafanaLoggerController);
    service = module.get<GrafanaLoggerService>(GrafanaLoggerService);
  });

  // Test case: Ensure that the controller is defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Test suite for the sendLog method
  describe('sendLog', () => {
    // Test case: Ensure that the loggerService.log method is called with correct parameters
    it('should call loggerService.log method with correct parameters', async () => {
      const mockLogMessage: LogMessageDto = {
        serviceName: 'TestService',
        message: 'Test message',
        methodName: 'testMethod',
        level: 'INFO', // Add level property
      };
      // Mock the log method of the service to resolve as a promise
      const logSpy = jest
        .spyOn(service, 'log')
        .mockReturnValueOnce(Promise.resolve() as unknown as string);

      // Call the sendLog method of the controller with the mock log message
      controller.sendLog(mockLogMessage);

      // Assert that the log method of the service is called with correct parameters
      expect(logSpy).toHaveBeenCalledWith(
        mockLogMessage.serviceName,
        mockLogMessage.message,
        mockLogMessage.methodName,
      );
    });
  });

  // Test suite for the sendError method
  describe('sendError', () => {
    // Test case: Ensure that the loggerService.error method is called with correct parameters
    it('should call loggerService.error method with correct parameters', async () => {
      const mockLogMessage: LogMessageDto = {
        serviceName: 'TestService',
        message: 'Test message',
        methodName: 'testMethod',
        level: 'ERROR', // Add level property
      };
      // Mock the error method of the service to resolve as a promise
      const errorSpy = jest
        .spyOn(service, 'error')
        .mockReturnValueOnce(Promise.resolve() as unknown as string);

      // Call the sendError method of the controller with the mock log message
      controller.sendError(mockLogMessage);

      // Assert that the error method of the service is called with correct parameters
      expect(errorSpy).toHaveBeenCalledWith(
        mockLogMessage.serviceName,
        mockLogMessage.message,
        mockLogMessage.methodName,
      );
    });
  });
});
