import { fakeSchedulers as _fakeSchedulers } from 'rxjs-marbles/fake';
import { vi } from 'vitest';

/**
 * Vitest port of rxjs-marbles/jest fakeSchedulers
 * @param fakeTest
 * @returns
 */
export function fakeSchedulers(
  fakeTest: (advance: (milliseconds: number) => void) => any
): () => any {
  let fakeTime = 0;
  return _fakeSchedulers(
    () =>
      fakeTest((milliseconds) => {
        fakeTime += milliseconds;
        vi.advanceTimersByTime(milliseconds);
      }),
    () => fakeTime
  );
}
