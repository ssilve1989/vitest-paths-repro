import { marbles } from 'rxjs-marbles';
// this import, which makes the index and all of its dependencies valuated is what causes the problem
// if the import was a direct import reference the problem does not occur
import { pairwiseWith } from '..'; 

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
