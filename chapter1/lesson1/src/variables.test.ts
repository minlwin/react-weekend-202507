import { convertArray, getDetails } from "./variables"

test("Usign Unknown Type", () => {
    expect(getDetails(10)).toBe("/users/10")
    expect(getDetails("c001")).toBe("/users/c001")
    expect(getDetails(true)).toBe("/users/true")
})

test("Convert Array Test", () => {
    // Prepare Input
    const input = [1, 2, 3]

    // Execute
    const result = convertArray(input)

    expect(result.length).toBe(3)
    expect(result[0]).toEqual([1])
    expect(result[1]).toEqual([1, 2])
    expect(result[2]).toEqual([1, 2, 3])
    expect(result[3]).toEqual(undefined)

})

test("Reducing Array", () => {
    const input = Array.from({length : 5}, (_, index) => index + 1)

    const result = input.reduce((prev, current) => prev + current)
    expect(result).toBe(15)

    const strResult = input.map(a => `${a}`).reduce((a, b) => a + b)
    expect(strResult).toBe("12345") 

    const joinResult = input.map(a => `${a}`).join(", ")
    expect(joinResult).toBe("1, 2, 3, 4, 5") 
})