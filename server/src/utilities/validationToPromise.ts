/**
 * Gotten from here:
 * https://www.olioapps.com/blog/checking-types-real-world-typescript/
 *
 * The idea is to use the helper function to validate types, the function returns a Promise
 * Promise resolves if the data is matching the type, and
 * rejects if the data doesn't match the type.
 */
import t from 'io-ts'
import { reporter } from "io-ts-reporters";

/**
 * Apply a validator and get the result in a `Promise`.
 * Promise resolves if data matches type, otherwise it's rejected.
 */
export function validate<T, O, I>(
  validator: t.Type<T, O, I>,
  input: I
): Promise<T> {
  const result = validator.decode(input);
  return result.fold(
    errors => {
      const messages = reporter(result);
      return Promise.reject(new Error(messages.join("\n")));
    },
    value => Promise.resolve(value)
  );
}
