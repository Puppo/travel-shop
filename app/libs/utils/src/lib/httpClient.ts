import { ZodError, ZodType, z } from 'zod';
import { ApplicationError, HttpRequestError, ValidationError } from './errors';

type fetch = typeof fetch;
type Input = Parameters<fetch>[0];
type Init = Parameters<fetch>[1];

export function httpClient(input: Input, init?: Init): Promise<never>;
export function httpClient<T extends ZodType = never>(
  input: Input,
  init: Init & { schema: T }
): Promise<z.infer<T>>;
export async function httpClient<T extends ZodType = any>(
  input: Input,
  init?: Init & { schema?: T }
): Promise<z.infer<T>> {
  let res: Response;
  try {
    res = await fetch(input, init);
  } catch (error) {
    throw new HttpRequestError(`Error while fetching ${input}`, error);
  }

  if (!res.ok) throw new HttpRequestError(`Error while fetching ${input}`, res);

  if (init?.schema) {
    try {
      const data = await res.json();
      return init.schema.parse(data);
    } catch (error) {
      if (error instanceof ZodError)
        throw new ValidationError(`Error while parsing ${input}`, error);
      throw new ApplicationError(`Error while parsing ${input}`, error);
    }
  }
  return;
}
