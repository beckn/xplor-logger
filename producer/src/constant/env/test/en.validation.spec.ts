import * as Joi from 'joi';

import validateEnvironmentVariables from '../../../env/validation/env.validation';
import {
  environmentVariables,
  invalidEnvironmentVariables,
  missingEnvironmentVariables,
} from '../env.mock';

describe('Environment Variables Validation', () => {
  it('should validate environment variables schema successfully', () => {
    // Define the environment variables to validate

    // Define the schema
    const schema = Joi.object(validateEnvironmentVariables());

    // Validate the environment variables against the schema
    const { error, value } = schema.validate(environmentVariables);

    // Assert that there are no validation errors
    expect(error).toBeUndefined();

    // Assert that the validated values match the input values
    expect(value).toEqual(environmentVariables);
  });
  it('should throw validation error for missing required variables', () => {
    // Define the environment variables with missing required values

    // Define the schema
    const schema = Joi.object(validateEnvironmentVariables());

    // Validate the environment variables against the schema
    const { error } = schema.validate(missingEnvironmentVariables);

    // Assert that a validation error is thrown for missing required variables
    expect(error).toBeDefined();
  });

  it('should throw validation error for invalid environment variables', () => {
    // Define the schema
    const schema = Joi.object(validateEnvironmentVariables());

    // Validate the environment variables against the schema
    const { error } = schema.validate(invalidEnvironmentVariables);

    // Assert that a validation error is thrown for invalid environment variables
    expect(error).toBeDefined();
  });
});
