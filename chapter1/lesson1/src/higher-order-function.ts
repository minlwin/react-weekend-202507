export type Operator = (a: number, b: number) => number

/**
 * Function taking Function as Argument
 * 
 * @param a 
 * @param b 
 * @param operator 
 * @returns 
 */
export function operate(
    a:number, 
    b:number, 
    operator : Operator) {
        return operator(a, b)
}

export type Operation = (a: number) => (b: number) => number

export const plusOperation:Operation = a => b => a + b

export type NumberFunction = (a:number) => number

export const Calculation = (...funcs:NumberFunction[]) => 
(x:number) => funcs.reduce((acc, func) => func(acc), x)