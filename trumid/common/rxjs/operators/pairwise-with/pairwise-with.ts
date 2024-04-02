import { Observable, OperatorFunction } from 'rxjs';
import { scan } from 'rxjs/operators';

/**
 * Like `pairwise` but allows you to specify a default first emission so that it triggers immediately on the source
 * observables first emission instead of waiting for the 2nd
 * @param initialValue
 */
export function pairwiseWith<T>(initialValue: T): OperatorFunction<T, [T, T]> {
  return (source$: Observable<T>) =>
    source$.pipe(scan(([, next], current) => [next, current], [initialValue, initialValue]));
}
