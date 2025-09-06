export type VoidFunction = () => void
export type OperatorFunction = (a:number, b:number) => number
type IdentityFunction<T> = (data: T) => T
export type MapperFunction<T, R> = (data: T) => R

export const plus:OperatorFunction = (a, b) => a + b
export const makeTwice:IdentityFunction<number> = (a) => a * 2
export const toUpper:IdentityFunction<string> = (a) => a.toUpperCase()