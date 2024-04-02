import Immutable from 'immutable';
import { combineLatest, Observable } from 'rxjs';
import { map, scan, startWith } from 'rxjs/operators';
import { mapSetDifference } from '../operators';

/**
 * Takes add/remove event emissions of a certain entity (K) from a list of similar input observables,
 * returns a single observable that re-emits those events only when necessary, i.e. when entity was added
 * for a first time on any of the inputs or when the last occurence of that entity was removed
 * @param sources array of input observables with the same Observable<T> signatures
 * @param getter function to extract the entity K and whether the event is an addition or removal
 * @param setter function to construct the downstream emissions based on K entity being added or removed
 */
export function mergeWithSetDiff<T, K>(
  sources: Observable<T>[],
  getter: (event: T) => [K, boolean],
  setter: (value: K, isAdd: boolean) => T
): Observable<T> {
  return combineLatest(
    sources.map((observable) =>
      observable.pipe(
        scan((set, event) => {
          const [value, isAdd] = getter(event);
          return isAdd ? set.add(value) : set.remove(value);
        }, Immutable.Set<K>()),
        startWith(Immutable.Set<K>())
      )
    )
  ).pipe(
    map((sets) => Immutable.Set.union<K>(sets)),
    mapSetDifference(setter)
  );
}
