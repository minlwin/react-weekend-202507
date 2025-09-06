import { addValue, ReadonlyValue } from "./mutable-inputs"

test("Mutable Input Problem", () => {
    const a:ReadonlyValue = {data : 10}
    const b:ReadonlyValue = {data : 5}

    expect(addValue(a, b).data).toBe(15)

    expect(addValue(a, b).data).toBe(15)

})