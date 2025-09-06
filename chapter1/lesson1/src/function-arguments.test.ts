import { getMessages, greet, sum } from "./function-arguments"

test("Optional Parameter Test", () => {
    expect(greet("Min Lwin")).toBe("Hello! I am Min Lwin.")
    expect(greet("Min Lwin", 50)).toBe("Hello! I am Min Lwin, and 50 years old.")
})

test("Default Parameter Test", () => {
    expect(getMessages("Hello React")).toEqual(["Hello React"])
    expect(getMessages("Hello React", 3)).toEqual([
        "Hello React",
        "Hello React",
        "Hello React"
    ])

    expect(getMessages("Hello React", 0)).toEqual([])
    expect(getMessages("Hello React", -1)).toEqual([])
})

test("Rest Parameter Test", () => {
    expect(sum("Marks")).toEqual(["Marks", 0])
    expect(sum("Marks", 1)).toEqual(["Marks", 1])
    expect(sum("Marks", 1, 2)).toEqual(["Marks", 3])
    expect(sum("Marks", 1, 2, 3)).toEqual(["Marks", 6])
})