export function getDetails(id:unknown) {
    return `/users/${id}`
}

export function convertArray(array: number[]):number[][] {
    return array
        .map(a => ({length : a}))
        .map(a => Array.from(a, (_, index) => index + 1))
}
