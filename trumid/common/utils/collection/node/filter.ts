export function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

export function isNotEmpty<T>(x: T | undefined | null): x is T {
  return x !== undefined && x !== null;
}
