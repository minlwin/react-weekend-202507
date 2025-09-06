import { add, multiply, sayHello } from "./define-functions"

test("Legacy Style Function Definition", () => {
    expect(sayHello("TypeScript")).toBe("Hello TypeScript")
})

test("Anonymous Function Definition", () => {
    expect(add(10, 5)).toBe(15)
})

test("Arrow Function Definition", () => {
    expect(multiply(10, 5)).toBe(50)
})