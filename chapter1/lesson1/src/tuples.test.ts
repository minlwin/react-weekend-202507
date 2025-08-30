import { multiply } from "./tuples"

test("Test Multiply", () => {
    let result = multiply([1, 2])
    expect(result).toBe(2)
})

