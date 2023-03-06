import { ZodType, z } from 'zod';
import { ValidationError } from './errors';

export const validation = <T extends ZodType>(
  schema: T,
  data: unknown
): z.infer<T> => {
  const result = schema.safeParse(data);
  if (result.success) return result.data;

  throw new ValidationError('Validation error', result.error);
};
