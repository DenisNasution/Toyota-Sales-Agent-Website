export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const createCustomError = (message: any, statusCode: any) => {
  return new CustomError(message, statusCode);
};
