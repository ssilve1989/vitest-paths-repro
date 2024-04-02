import { merge, Observable } from 'rxjs';
import { filter, first, map, scan } from 'rxjs/operators';
import { isDefined } from 'unity/trumid/common/utils/collection/node/filter';

interface Complete {
  expectedMessages: number;
}

/**
 * @param source$ the Observable returned by a snapshot-plus-stream request
 *
 * @returns an Observable without "complete" message between snapshot and post-snapshot
 */
export function mergeSnapshot<T>(source$: Observable<{ message?: T | null }>): Observable<T> {
  return new Observable((subscriber) => {
    return source$.subscribe({
      complete: () => subscriber.complete(),
      error: (err) => subscriber.error(err),
      next: ({ message }) => {
        if (message) {
          subscriber.next(message);
        }
      },
    });
  });
}

export function mergeComplete(
  source$: Observable<{ [key: string]: any; complete?: Complete }>
): Observable<Complete> {
  return source$.pipe(
    map(({ complete }) => complete),
    filter(isDefined)
  );
}

export function mergeAllComplete(
  sources$: Observable<{ [key: string]: any; complete?: Complete }>[]
): Observable<{ complete: Complete }> {
  return merge(...sources$).pipe(
    mergeComplete,
    scan(
      ({ complete: { expectedMessages }, count }, complete) => ({
        complete: { expectedMessages: expectedMessages + complete.expectedMessages },
        count: count + 1,
      }),
      { complete: { expectedMessages: 0 }, count: 0 }
    ),
    first(({ count }) => count === sources$.length),
    map(({ count, ...rest }) => rest)
  );
}
