import Immutable from 'immutable';
import { OperatorFunction } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { pairwiseWith } from '..';

type SetType<T> = Set<T> | Immutable.Set<T>;

export function mapBatchedSetDifference<TEntity>(
  defaultSet: SetType<TEntity> = Immutable.Set<TEntity>()
): OperatorFunction<SetType<TEntity>, { additions: TEntity[]; removals: TEntity[] }> {
  return (source$) =>
    source$.pipe(
      pairwiseWith(defaultSet),
      map(([prev, next]) => {
        const additions: TEntity[] = [];
        const removals: TEntity[] = [];

        // It's faster to iterate over the set twice than do union or difference
        for (const nextValue of next) {
          if (!prev.has(nextValue)) additions.push(nextValue);
        }

        for (const prevValue of prev) {
          if (!next.has(prevValue)) removals.push(prevValue);
        }

        return { additions, removals };
      })
    );
}

export function mapSetDifference<TEntity, TAction>(
  mapper: (entity: TEntity, isAdd: boolean) => TAction,
  defaultSet: SetType<TEntity> = Immutable.Set<TEntity>()
): OperatorFunction<SetType<TEntity>, TAction> {
  return (source$) =>
    source$.pipe(
      mapBatchedSetDifference(defaultSet),
      mergeMap(({ additions, removals }) => [
        ...additions.map((entity) => mapper(entity, true)),
        ...removals.map((entity) => mapper(entity, false)),
      ])
    );
}
