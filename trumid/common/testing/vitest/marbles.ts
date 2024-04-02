import {
  Configuration,
  configure as _configure,
  Context,
  defaults,
  MarblesFunction,
} from 'rxjs-marbles';
import { _cases, NamedCase, UnnamedCase } from 'rxjs-marbles/cases';

export interface CasesFunction {
  <T extends UnnamedCase>(
    name: string,
    func: (context: Context, _case: T) => void,
    cases: { [key: string]: T }
  ): void;
  <T extends NamedCase>(name: string, func: (context: Context, _case: T) => void, cases: T[]): void;
}

export function configure(configuration: Configuration): {
  cases: CasesFunction;
  marbles: MarblesFunction;
} {
  const { marbles } = _configure({
    ...defaults(),
    assertDeepEqual: (a, e) => expect(a).toStrictEqual(e),
    frameworkMatcher: true,
    ...configuration,
  });

  function cases<T extends UnnamedCase>(
    name: string,
    func: (context: Context, _case: T) => void,
    cases: { [key: string]: T }
  ): void;
  function cases<T extends NamedCase>(
    name: string,
    func: (context: Context, _case: T) => void,
    cases: T[]
  ): void;
  function cases(name: string, func: any, cases: any): void {
    describe(name, () => {
      _cases((c) => {
        const t = c.only ? test.only : c.skip ? test.skip : test;
        if (func.length > 2) {
          t(
            c.name,
            marbles((m: any, second: any, ...rest: any[]) => func(m, c, second, ...rest))
          );
        } else {
          t(
            c.name,
            marbles((m, ...rest: any[]) => func(m, c, ...rest))
          );
        }
      }, cases);
    });
  }

  return { cases, marbles };
}

const { cases, marbles } = configure({});
export { cases, marbles };
