type Point = [number, number]
type IdAndName = [number, string]

export function multiply(point: Point) {
    return point[0] * point[1]
}

export function getUser(id: number, name: string):IdAndName {
    return [id, name]
}