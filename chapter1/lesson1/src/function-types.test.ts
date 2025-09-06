import { makeTwice, plus, toUpper } from "./function-types"

test("Function Type for Plus", () => {
    expect(plus(10, 5)).toBe(15)
})

test("Generic Function Test 1", () => {
    Array.from({length : 10}).map((_, index) => index + 1)
        .forEach(value => {
            expect(makeTwice(value)).toBe(value * 2)
        })
})

test("Generic Function Test 2", () => {
    expect(toUpper("Hello TypeScript")).toBe("HELLO TYPESCRIPT")
})