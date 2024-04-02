import { marbles } from 'rxjs-marbles';
import { pairwiseWith } from './pairwise-with';

describe('pairwiseWith', () => {
  it(
    'emits pairs with an initial value when the source only emits once',
    marbles((m) => {
      const source = m.cold('a', { a: 1 });
      const expected = m.cold('a', { a: [0, 1] as [number, number] });

      const destination = source.pipe(pairwiseWith(0));

      m.expect(destination).toBeObservable(expected);
    })
  );
});
