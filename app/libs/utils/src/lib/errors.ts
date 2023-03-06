import { ZodError } from 'zod';

export class ApplicationError extends Error {
  constructor(message: string, public readonly cause: unknown) {
    super(message);
  }
}

export class HttpRequestError extends ApplicationError {}

export class ValidationError extends Error {
  constructor(message: string, public readonly cause: ZodError) {
    super(message);
  }
}

export const trackError = (error: unknown = {}, extraInfo = {}) => {
  console.log('trackError', error, extraInfo);
};
