export interface ValidationError {
  message: string;
  path: (string | number)[];
  type: string;
  context?: any;
}

const validationErrorFormator = (validationResult: ValidationError[]) => {
  const formattedErrors: Record<string, string> = {};
  validationResult.forEach((error) => {
    const pathString = error.path.join('.');
    const errorMessage = error.message.replace(/["']/g, '');
    formattedErrors[pathString] = errorMessage;
  });
  return formattedErrors;
};

export default validationErrorFormator;
