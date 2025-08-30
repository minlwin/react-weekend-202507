type Point = [number, number]
type IdAndName = [number, string]

export function multiply(point: Point) {
    return point[0] * point[1]
}

export function getId(input:IdAndName) {
    return input[0]
}

export function getName(input: IdAndName) {
    return input[1]
}