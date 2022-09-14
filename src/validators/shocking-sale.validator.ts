import { registerDecorator, ValidationOptions } from 'class-validator';

export function ValidateShockingSale(validationOptions?: ValidationOptions) {
  return (object: Record<string, unknown>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value, validationArguments?) {
          // TODO
          return true;
        },
      },
    });
  };
}
