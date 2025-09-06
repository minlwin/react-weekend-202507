export type Value = {
    data : number
}

export type ReadonlyValue = Readonly<Value>

export function addValue(a: ReadonlyValue, b: ReadonlyValue) : Value {
    return {
        data : a.data + b.data
    }
}