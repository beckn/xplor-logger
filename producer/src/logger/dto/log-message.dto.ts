// Import decorators from class-validator for validating the properties of the DTO.
import { IsString, IsOptional } from 'class-validator';

export class LogMessageDto {
  // The name of the service that generated the log message.
  // This is a required string field.
  @IsString()
  serviceName: string;

  // The actual log message.
  // This can be any type, but it's recommended to keep it as a string for consistency.
  @IsString()
  message: any;

  // The severity level of the log message.
  // This is a required string field and should match one of the predefined log levels.
  @IsString()
  level: string;

  // The name of the method within the service that generated the log message.
  // This field is optional and can be used to provide more context about where the log message originated.
  @IsOptional()
  @IsString()
  methodName?: string;

 
}
