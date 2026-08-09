declare module 'factorial' {
  function factorial(n: number, opt: { useBigInt: true }): bigint;
  function factorial(n: number, opt?: { useBigInt?: false }): number;
  export default factorial;
}

declare module 'lodash.isfinite' {
  function lodashIsFinite(value?: unknown): boolean;
  export default lodashIsFinite;
}
