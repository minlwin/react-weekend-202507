import { Calculation, NumberFunction, operate, plusOperation } from "./higher-order-function"

test("Higher Order Function", () => {
    expect(operate(10, 5, (a, b) => a + b)).toBe(15)
    expect(operate(10, 5, (a, b) => a - b)).toBe(5)
    expect(operate(10, 5, (a, b) => a * b)).toBe(50)
    expect(operate(10, 5, (a, b) => a / b)).toBe(2)
})

test("Returning Function", () => {
    expect(plusOperation(10)(5)).toBe(15)
})

test("Composing Function", () => {
    const plus10:NumberFunction = a => a + 10
    const multply3:NumberFunction = a => a * 3
    const minus5:NumberFunction = a => a - 5

    const composed = Calculation(plus10, multply3, minus5)

    expect(composed(10)).toBe(55)
})