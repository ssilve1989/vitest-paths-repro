import { lastValueFrom, of, toArray } from 'rxjs';
import { marbles } from 'rxjs-marbles';
import { mergeAllComplete, mergeSnapshot } from './merge-snapshot';

interface Complete {
  expectedMessages: number;
}

const makeComplete = (expectedMessages: number) => ({ complete: { expectedMessages } });

describe('merge snapshot operators', () => {
  describe('mergeAllComplete', () => {
    it(
      'merges all input observables complete signals into one',
      marbles((m) => {
        const data: { [key: string]: any; complete?: Complete } = {
          a: {},
          b: {},
          c: {},
          d: {},
          e: {},
          x: makeComplete(5),
          y: makeComplete(1),
          z: makeComplete(6),
        };

        const source1 = m.cold(' ---y|         ', data);
        const source2 = m.cold(' a-b-c-d-e-x|  ', data);
        const expected = m.cold('----------(z|)', data);

        const destination = mergeAllComplete([source1, source2]);

        m.expect(destination).toBeObservable(expected);
      })
    );

    it('produces only a single output', async () => {
      const one$ = of(makeComplete(2));
      const two$ = of({ foo: 'bar' }, makeComplete(5));

      const result$ = mergeAllComplete([one$, two$]);
      const results = await lastValueFrom(result$.pipe(toArray()));
      expect(results.length).toBe(1);
      expect(results).toEqual([{ complete: { expectedMessages: 7 } }]);
    });
  });

  describe('mergeSnapshot', () => {
    it(
      'should filter out falsy messages, then map to the message',
      marbles((m) => {
        const data = { a: { message: 'a' }, b: { message: 'b' }, c: { message: null } };
        const source = m.cold('   a-b-c|', data);
        const expected = m.cold(' a-b--|');
        const subs = ['           ^----!'];

        const destination = source.pipe(mergeSnapshot);

        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
      })
    );

    it(
      'skip invalid data objects',
      marbles((m) => {
        const data = { a: { message: 'a' }, b: { invalidObject: 'wee!' }, c: { message: null } };
        const source = m.cold('   a-b-c|', data);
        const expected = m.cold(' a----|');
        const subs = ['           ^----!'];

        // @ts-expect-error This is incorrect on purpose. If this is suddenly correct, then the types are wrong.
        const destination = source.pipe(mergeSnapshot);

        // @ts-expect-error This is incorrect on purpose. If this is suddenly correct, then the types are wrong.
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
      })
    );

    it(
      'should handle errors from the source',
      marbles((m) => {
        const data = { a: { message: 'a' } };
        const source = m.cold('  ---a--#', data);
        const expected = m.cold('---a--#');
        const subs = ['          ^-----!'];
        const destination = source.pipe(mergeSnapshot);
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
      })
    );
  });
});
